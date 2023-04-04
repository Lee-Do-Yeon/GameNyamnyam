from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from recommend import recommend_game_final
import os
from gensim.models import Word2Vec # word2vec의 알고리즘 호출
# ----------------------- 추후 삭제
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import RegexpTokenizer
import numpy as np
# -----------------------


from api.api import api_router

app = FastAPI(
    title = "Game Nyamnyam API"
)

# CORS 설정
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

app.include_router(api_router)

@app.on_event("startup")
async def save_model():
    # Download stopwords
    nltk.download('stopwords')

    # 파일 경로 설정
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    game_df = recommend_game_final.get_top_200()

    #-----------------------------------------------------------------------------------
    # 데이터 정제 (TO DO : 이 부분은 영어 데이터를 직접 정제 후 DB에 삽입하기)

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

    #------------추후 삭제-----------------------------------------------------------------------

    # word2Vec 모델 생성
    corpus = [words.split() for words in game_df['cleaned']]
    word2vec_model = Word2Vec(vector_size=300, window=5, min_count=2, workers=-1) # size 300, window 5 설정
    word2vec_model.build_vocab(corpus)
    word2vec_model.wv.vectors_lockf = np.ones(len(word2vec_model.wv))
    word2vec_model.wv.intersect_word2vec_format(BASE_DIR+'/app/recommend/GoogleNews-vectors-negative300.bin.gz', lockf=1.0, binary=True) # pre-trained data
    word2vec_model.train(corpus, total_examples=word2vec_model.corpus_count, epochs=15)

    word2vec_model.save("word2vec.model")

    print("모델 저장 완료")