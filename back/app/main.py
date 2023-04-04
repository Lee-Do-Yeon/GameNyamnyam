from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from recommend import recommend_game_final
import os
from gensim.models import Word2Vec # word2vec의 알고리즘 호출
import numpy as np


from api.api import api_router

app = FastAPI(
    title="Game Nyamnyam API"
)

# CORS 설정
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

@app.on_event("startup")
async def save_model():
    print("모델 저장 중 ...")
    # 파일 경로 설정
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    game_df = recommend_game_final.get_top_200()

    # 빈 행 제거
    game_df['clean_description'].replace('', np.nan, inplace=True)
    game_df = game_df[game_df['clean_description'].notna()]

    # word2Vec 모델 생성
    corpus = [words.split() for words in game_df['clean_description']]
    word2vec_model = Word2Vec(vector_size=300, window=5, min_count=2, workers=-1) # size 300, window 5 설정
    word2vec_model.build_vocab(corpus)
    word2vec_model.wv.vectors_lockf = np.ones(len(word2vec_model.wv))
    word2vec_model.wv.intersect_word2vec_format(BASE_DIR+'/app/recommend/GoogleNews-vectors-negative300.bin.gz', lockf=1.0, binary=True) # pre-trained data
    word2vec_model.train(corpus, total_examples=word2vec_model.corpus_count, epochs=15)

    word2vec_model.save("word2vec.model")

    print("모델 저장 완료")