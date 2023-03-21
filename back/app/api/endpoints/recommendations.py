import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

'''
Input: 분석된 취향, 게임들
Output: 게임별 매치율 리스트

(1) 장르
preference: ['액션', '인디']

(2) appid만
games: [{'appid':1234, 'genres':'인디, 액션'}, ...]

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
Input: 게임들.
Output: 비슷한 게임 appid 리스트.

TO DO : 
비슷한 게임 구하기.

(1) 해당 게임들(장바구니)로부터 성향 분석
(2) 도출된 성향과 일치하는 게임 추천(전체에서?)
'''
def get_similar():
    result = []
    return result


'''
Input: 분석 성향
Output: 추천된 게임 appid 리스트.

TO DO : 
전체 게임에 대해서 초밥 레일에 올리기위한 게임 상위 30개 구하기.

about game에 대한 TF-IDF 유사도. (승빈님 알고리즘)
'''

def get_초밥레일() :
    result = []
    return result