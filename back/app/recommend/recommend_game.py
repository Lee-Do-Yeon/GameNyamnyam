import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity


'''
Input: 예전에 구매한 게임
Output: 분석 취향
'''


def get_preference(genres):

    # 장르 ,로 구분해서 나누기
    genre_list = []
    for genre in genres:
        try:
            genre_list.extend(genre['genres'].split(','))
        except TypeError:
            continue

    # 장르 카운트하기
    genre_count_dict = {}
    for genre in set(genre_list):
        count = genre_list.count(genre)
        genre_count_dict[f'{genre}'] = count

    # 개수대로 정렬하기
    sorted_dict = dict(sorted(genre_count_dict.items(),
                       key=lambda x: x[1], reverse=True))

    # 상위 5개 뽑기
    result = list(sorted_dict.keys())[:5]

    return result


'''
Input: 분석된 취향, 게임들
Output: 게임별 매치율 리스트
'''


def get_rate(preference, games):

    # appid가 0이면 '나'
    games.append({'appid': 0, 'genres': ','.join(preference)})

    df = pd.DataFrame(games).set_index('appid')

    # genres열 원핫인코딩
    one_hot_genres = pd.get_dummies(df['genres'].str.split(
        ',', expand=True).stack()).groupby(level=0).sum()

    # 코사인 유사도
    cosine_similar = cosine_similarity(
        one_hot_genres, one_hot_genres.loc[0].values.reshape(1, -1))

    result_df = pd.DataFrame(cosine_similar).set_index(one_hot_genres.index)

    # 백분율로 계산.
    result_df[0] = round(result_df[0], 2)*100

    # key: appid, value: 코사인 유사도 값
    result = result_df.to_dict()[0]
    del result[0]

    return result
