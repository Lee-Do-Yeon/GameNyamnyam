import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

'''
Params: 분석된 취향, 게임들

(1) 장르
preference: ['액션', '인디']

(2) appid만
games: {1234, 2345, 34567}
'''
def get_result(preference, games):

    # appid가 0이면 '나'
    games.append({'appid':0, 'genres':', '.join(preference)})
    
    df = pd.DataFrame(games).set_index('appid')
    
    # genres열 원핫인코딩
    one_hot_genres = pd.get_dummies(df['genres'].str.split(', ', expand=True).stack()).groupby(level=0).sum()

    # 코사인 유사도
    cosine_similar = cosine_similarity(one_hot_genres, one_hot_genres.loc[0].values.reshape(1, -1))
    
    # key: appid, value: 코사인 유사도 값
    result = pd.DataFrame(cosine_similar).set_index(one_hot_genres.index).to_dict()[0]
    
    return result

'''
Params: 게임들.

비슷한 게임.
내부 알고리즘을 어떤 걸 할지 고민해봐야.
'''
def get_similar():
    result = []
    # 1) 해당 게임들로부터 성향 분석(get_user_preference)
    # 2) 도출된 성향과 일치하는 게임 추천 (get_result)
    return result


'''
들어오는 거 : 분석 성향

전체 게임에 대해서 초밥 레일에 올리기위한 게임 상위 30개.
이건 about game 으로.
'''

def get_초밥레일() :
    result = []
    return result