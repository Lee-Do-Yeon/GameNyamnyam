import pandas as pd
import numpy as np

from gensim.models import Word2Vec # word2vec의 알고리즘 호출
from gensim.models.word2vec import Word2Vec

from sklearn.metrics.pairwise import cosine_similarity

from db.Database import games

# 각 문서의 벡터를 추출, 이를 이용하여 유사도 행렬 계산
# Get document vectors
index_list_result = []
def get_document_vectors(document_list, model):
    document_embedding_list = []
    for index, line in document_list.iteritems():
        doc2vec = None
        count = 0
        for word in line.split():
            if word in model.wv.key_to_index:
                count += 1
                if doc2vec is None:
                    doc2vec = model.wv[word]
                else:
                    doc2vec = doc2vec + model.wv[word]
        if doc2vec is not None:
            doc2vec = doc2vec / count
            document_embedding_list.append(doc2vec)
            index_list_result.append(index)

    
    return document_embedding_list

# 선택한 게임에 대해 1개당 추천 20개씩 추출

# 게임에 대한 appid를 추출하는 함수

def get_game_indices(appid, df, cosine_similarities):
    # Get the index of the game based on its name
    indices = pd.Series(df.index, index=df['appid']).drop_duplicates()
    idx = indices[appid]
    sim_index = index_list_result[idx]
    # Get the indices of the most similar games based on the cosine similarities
    # 하나의 게임에 대한 모든 코사인 유사도 
    sim_scores = list(enumerate(cosine_similarities[sim_index]))
    sim_scores = sorted(sim_scores,reverse=True)
    sim_scores = sim_scores[1:21]
    game_indices = [i[0] for i in sim_scores] # 20개

    return game_indices

# 선택한 게임에 대한 정보를 추출하는 함수
def info_recommendations(appid, df, cosine_similarities):
    games = df[['appid']]
    # Get the indices of the recommended games
    game_indices = get_game_indices(appid, df, cosine_similarities)
    
    # Get the recommended games based on their indices
    recommend = games.iloc[game_indices].reset_index(drop=True)

    return recommend


def get_top_200():
    # (1) metacritc 있고 (2) 추천 수로 정렬된 데이터 (3) 200개 불러오기
    game_list = games.aggregate([
            { "$sort": { "recommendations": -1 } },
            { "$match": { "metacritic": { "$ne": 0 } } },
            { "$limit": 200 },
            { "$project": { "_id": 0, "recommendations": 1, "metacritic": 1, "short_description": 1, "appid": 1, "name": 1, "clean_description": 1  } }
        ])
    game_list = pd.DataFrame(list(game_list))

    return game_list.copy()


def get_cosine_similarities(game_df):
    # 빈 행 제거
    game_df['clean_description'].replace('', np.nan, inplace=True)
    game_df = game_df[game_df['clean_description'].notna()]
    # print('Total number of documents after cleaning:', len(game_df))

    word2vec_model = Word2Vec.load("word2vec.model")

    document_embedding_list = get_document_vectors(game_df['clean_description'], word2vec_model)
    # print('Number of document vectors:', len(document_embedding_list))

    # 코사인 유사도 계산
    cosine_similarities = cosine_similarity(document_embedding_list, document_embedding_list)
    # print('Size of cosine similarity matrix:', cosine_similarities.shape)


    return cosine_similarities


'''
외부에서 사용 할 함수
input : applist

'''
def get_recommended_games(owned_games):
    
    game_df = get_top_200()
    game_list = game_df.copy()

    cosine_similarities = get_cosine_similarities(game_df)

    # DB와 일치하는 유저의 게임 리스트 체크
    appid_list=[]
    for appid in owned_games:
        temp = game_df[game_df['appid']==appid]
        if(game_df[game_df['appid']==appid].empty):
            continue
        else:
            appid_list.append(temp['appid'].values[0])


    # 추천해준 게임에 대한 정보 반환
    for game_id in appid_list:
        try:
            recommend_info = info_recommendations(game_id, game_df, cosine_similarities)
            game_list = pd.concat(([game_list,recommend_info]))
            
        except Exception as e:
            continue
    

    # 중복 게임 제거
    random_games = game_list.drop_duplicates()

    # 후보 군에서 랜덤으로 30개 추출
    random_games = random_games.sample(n=30)
    return random_games['appid'].tolist()