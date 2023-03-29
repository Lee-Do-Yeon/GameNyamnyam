import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

'''
(1) preference: ['액션', '인디']

(2) games: [{'appid':1234, 'genres':'인디, 액션'}, ...]
'''


'''
Input: 예전에 구매한 게임
Output: 분석 취향
'''
def get_preference(games):
    
    # 구매 기록 게임으로부터 장르 전체 가져오기
    genre_list = []
    for game in games:
        genre_list.extend(game['genres'].split(', '))

    # 장르 카운트하기
    genre_count_dict = {}
    for genre in set(genre_list):
        count = genre_list.count(genre)
        genre_count_dict[f'{genre}'] = count
    
    # 개수대로 정렬하기
    sorted_dict = dict(sorted(genre_count_dict.items(), key=lambda x: x[1], reverse=True))
    
    # 상위 5개 뽑기
    result = list(sorted_dict.keys())[:5]

    return result

'''
Input: 분석된 취향, 게임들
Output: 게임별 매치율 리스트
'''
def get_result(preference, games):

    # appid가 0이면 '나'
    games.append({'appid':0, 'genres':', '.join(preference)})
    
    df = pd.DataFrame(games).set_index('appid')
    
    # genres열 원핫인코딩
    one_hot_genres = pd.get_dummies(df['genres'].str.split(', ', expand=True).stack()).groupby(level=0).sum()

    # 코사인 유사도
    cosine_similar = cosine_similarity(one_hot_genres, one_hot_genres.loc[0].values.reshape(1, -1))
    
    result_df = pd.DataFrame(cosine_similar).set_index(one_hot_genres.index)

    # 백분율로 계산.
    result_df[0] = round(result_df[0], 2)*100
    
    # key: appid, value: 코사인 유사도 값
    result = result_df.to_dict()[0]
    del result[0]
    
    return result

'''
Input: 게임들.
Output: 비슷한 게임 appid 리스트.

TO DO : 
비슷한 게임 구하기.

1번 - 카테고리를 사용한 알고리즘
(1) 해당 게임들(장바구니)로부터 성향 분석
(2) 도출된 성향과 일치하는 게임 추천(전체에서)

=> 이러면 그냥 get_preference(장바구니) + get_result(preference, 전체게임)

2번 - desc를 사용한 알고리즘
(1) 해당 게임들의 about_game 분석
(2) 일치하는 게임 추천 (전체에서)

'''
def get_similar(games):
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