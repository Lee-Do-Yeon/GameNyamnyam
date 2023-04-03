'''
import urllib.request



import time
import io


from io import BytesIO

from gensim.models import KeyedVectors

import re

'''
#---------------------
import pandas as pd
import numpy as np


import nltk
from nltk.corpus import stopwords
from nltk.tokenize import RegexpTokenizer

import gensim
from gensim.models import Word2Vec # word2vec의 알고리즘 호출
from gensim.models.word2vec import Word2Vec

import requests

from sklearn.metrics.pairwise import cosine_similarity
#---------------------
from db.Database import games
from dotenv import load_dotenv
import os
#--------------------
# env
load_dotenv()
steam_key = os.getenv('steam_key')


# Download stopwords
nltk.download('stopwords')

#-----------------------------------------------------------------------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# (1) metacritc 있고 (2) 추천 수로 정렬된 데이터 (3) 200개 불러오기
game_list = games.aggregate([
        { "$sort": { "recommendations": -1 } },
        { "$match": { "metacritic": { "$ne": 0 } } },
        { "$limit": 200 },
        { "$project": { "_id": 0, "recommendations": 1, "metacritic": 1, "short_description": 1, "appid": 1, "name": 1  } }
    ])
game_list = pd.DataFrame(list(game_list))
game_df = game_list.copy()



# 데이터 정제

# Data cleaning functions
def _removeNonAscii(s):
    return "".join(i for i in str(s) if  ord(i) < 128)

def make_lower_case(text):
    return text.lower()

def remove_stop_words(text):
    text = text.split()
    stops = set(stopwords.words("english"))
    text = [w for w in text if not w in stops]
    text = " ".join(text)
    return text

def remove_punctuation(text):
    tokenizer = RegexpTokenizer(r'[a-zA-Z]+')
    text = tokenizer.tokenize(text)
    text = " ".join(text)
    return text

# Data cleaning
game_df['cleaned'] = game_df['short_description'].apply(_removeNonAscii)
game_df['cleaned'] = game_df['cleaned'].apply(make_lower_case)
game_df['cleaned'] = game_df['cleaned'].apply(remove_stop_words)
game_df['cleaned'] = game_df['cleaned'].apply(remove_punctuation)


# 빈 행 제거
game_df['cleaned'].replace('', np.nan, inplace=True)
game_df = game_df[game_df['cleaned'].notna()]
print('Total number of documents after cleaning:', len(game_df))

# # word2Vec 모델 만들기

# 1천억 단어 규모의 구글 뉴스 데이터로 300만개의 단어의 임베딩을 
# 미리 학습시킨 Word2Vec 임베딩을 다운 받을 수 있다. 
# "GoogleNews-vectors-negative300.bin.gz" 다운받아 압축을 풀면 약 3GB 크기의 파일이 생긴다.

# Build Word2Vec model
corpus = [words.split() for words in game_df['cleaned']]
word2vec_model = Word2Vec(vector_size=300, window=5, min_count=2, workers=-1) # size 300, window 5 설정
word2vec_model.build_vocab(corpus)
word2vec_model.wv.vectors_lockf = np.ones(len(word2vec_model.wv))
# word2vec_model.wv.intersect_word2vec_format('GoogleNews-vectors-negative300.bin.gz', lockf=1.0, binary=True) # pre-trained data
word2vec_model.wv.intersect_word2vec_format(BASE_DIR+'/recommend/GoogleNews-vectors-negative300.bin.gz', lockf=1.0, binary=True) # pre-trained data
word2vec_model.train(corpus, total_examples=word2vec_model.corpus_count, epochs=15)


# 임베딩 잘 되었는지 확인
# word2vec_model.save('word2vec.model')
# word2vec_model=Word2Vec.load('word2vec.model')
# word2vec_model.wv['cleaned']

# 왜 166에서 151이 되는걸까
# append를 다 안 한다?
# 각 문서의 벡터를 추출, 이를 이용하여 유사도 행렬 계산
# Get document vectors
index_list_result = []
def get_document_vectors(index_list, document_list, model):
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

document_embedding_list = get_document_vectors(game_df.index.to_list(), game_df['cleaned'], word2vec_model)
print('Number of document vectors:', len(document_embedding_list))
#print(document_embedding_list)

# Calculate cosine similarity matrix
cosine_similarities = cosine_similarity(document_embedding_list, document_embedding_list)
print('Size of cosine similarity matrix:', cosine_similarities.shape)
print(pd.DataFrame(cosine_similarities))


# 선택한 게임에 대해 1개당 추천 20개씩 추출

# 게임에 대한 appid를 추출하는 함수

def get_game_indices(appid, df, cosine_similarities):
    # Get the index of the game based on its name
    indices = pd.Series(df.index, index=df['appid']).drop_duplicates()
    idx = indices[appid]
    print(idx)
    sim_index = index_list_result[idx]
    # Get the indices of the most similar games based on the cosine similarities
    # 하나의 게임에 대한 모든 코사인 유사도 
    sim_scores = list(enumerate(cosine_similarities[sim_index]))
    sim_scores = sorted(sim_scores,reverse=True)
    sim_scores = sim_scores[1:21]
    print("sim_scores")
    print(sim_scores)
    game_indices = [i[0] for i in sim_scores] # 20개

    return game_indices

# 선택한 게임에 대한 정보를 추출하는 함수
def info_recommendations(appid, df, cosine_similarities):
    games = df[['appid']]
    # Get the indices of the recommended games
    game_indices = get_game_indices(appid, df, cosine_similarities)
    print("game_indices!!!!!!!!!")
    print(game_indices)
    
    # Get the recommended games based on their indices
    recommend = games.iloc[game_indices].reset_index(drop=True)

    return recommend


# -------------------------------------input으로 줘야지. --------------------------------------------------

users = {"sua":"76561198797386305","ong":"76561198099903362","yeon":"76561198135409603"}
appid=users["yeon"]

res = requests.get(f'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key={steam_key}&steamid={appid}').json()

game_cnt=res['response']['game_count']

print(f"사용자가 구매한 게임 개수 : {game_cnt}")

user_games = res['response']['games']

owned_games = []
print("사용자가 구매 기록 게임 appid 리스트 >>")
for i in range(game_cnt):
    owned_games.append(str(user_games[i]["appid"]))
    
print(owned_games)
    

# 선택한 유저의 게임 개수와 유저의 게임 항목 체크
appid_list=[]
for appid in owned_games:
    temp = game_df[game_df['appid']==appid]
    if(game_df[game_df['appid']==appid].empty):
        continue
    else:
        appid_list.append(temp['appid'].values[0])

print('DB와 일치하는 유저의 게임 개수 : ',len(appid_list))
print('DB와 일치하는 유저의 게임 리스트 : ',appid_list)

# input : appid_list

# ---------------------------------------------------------------------------------------

# # 추천해준 게임에 대한 정보 반환

# 추천 결과를 저장할 데이터프레임을 생성합니다.
recommend_df = pd.DataFrame()

for game_id in appid_list:
    print(game_id)
    try:
        recommend_info = info_recommendations(game_id, game_df, cosine_similarities)
        game_list = pd.concat(([game_list,recommend_info]))
        
    except Exception as e:
        print(f"예외 발생: {e}")
        continue

random_games = game_list.drop_duplicates()

print('추천 게임 후보 개수 : ', len(game_list))

print('추천 게임 후보 개수(중복제외) : ', len(random_games))


# # 후보 군에서 랜덤으로 60개를 비복원 추출한다.

# 복원추출을 하려면 replace=True
random_games = random_games.sample(n=30)
print(random_games['appid'].tolist())
'''
'''
