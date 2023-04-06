# 🍣게임냠냠

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
<img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=FastAPI&logoColor=white">
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
<img src="https://img.shields.io/badge/Jupyter-F37626?style=for-the-badge&logo=Jupyter&logoColor=white">
<img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=white">

## 1. 서비스 설명

### 개요

- **진행 기간** : **2023.03.27 ~ 2023.04.07 (6주)**

- 한줄 소개 : 이전 게임 구매 기록 기반 Steam 게임 추천 서비스

- 서비스 명 : **게임냠냠 (Nyamnyam)**
  <br/>
  <br/>

## 2. 기획 배경

### 📋 배경

- 선택하기 어렵고 너무 많은 게임들.. 게임하듯 재밌게 내가 좋아할만한 게임을 추천받을 순 없을까?
  <br/>

### 🎯 타겟

- 어떤 게임을 해야할지 모르겠는 사람

- 새로운 게임을 추천받고 싶은 사람

  <br/>
  <br/>

## 3.  아키텍처

![image](https://user-images.githubusercontent.com/44861724/230246422-1105f9e2-0852-412b-ad64-7759bf3f7557.png)


<br/>

## 4. UI / UX

## 와이어프레임(Figma)

![image](https://user-images.githubusercontent.com/44861724/230244591-40b6cb5c-a776-4e0f-a5fd-8a5e27de9af9.png)


<br/><br/>


## 5. 서비스

### 📺 시연영상

동영상 자리

<br/><br/>

### 🔎 주요기능

### 메인페이지

- OpenId를 이용한 스팀 로그인 연동

![image](https://user-images.githubusercontent.com/44861724/230276576-75c074cd-b935-40c4-91aa-e6d509ea8fab.png)
![image](https://user-images.githubusercontent.com/44861724/230278700-c94eaf60-03c9-4b86-8d8f-a89277b9e8f0.png)

<br/><br/>

### 게임 리스트
- 회전 초밥 느낌의 플래시 게임풍 디자인
- 이전 게임 구매 기록 개수에 따른 맞춤형 게임 리스트

|          | 5개 이상 | 5개 미만 |
|----------|---------|---------|
| 맞춤 게임 | 30개    | 0개     |
| 랜덤 게임 | 15개    | 25개    |
| 신규 게임 | 5개     | 5개     |
| 인기 게임 | 10개    | 30개    |

- 맞춤게임 → Word2Vec 모델을 이용하여 유사한 소개글(description)을 가진 게임들을 추출.

![image](https://user-images.githubusercontent.com/44861724/230276935-9b2dae40-3429-4941-a511-54c31087d988.png)
![image](https://user-images.githubusercontent.com/44861724/230277237-fb712132-5826-4fba-b1e1-af840f76ff3a.png)

<br/><br/>

### 추천 결과
- 이전 구매 기록 기반 선호 장르 최대 5개 추출
- 선택한 게임 중 선호 장르와 유사도에 따른 백분율 추출
- 선택한 게임들과 비슷한 게임 3개 추천

![image](https://user-images.githubusercontent.com/44861724/230317282-1e73ef19-a21a-4e69-917e-53ba7eab2c51.png)

![image](https://user-images.githubusercontent.com/44861724/230278527-1ec2dc4b-a456-4288-807d-19dae647e3fd.png)

<br/><br/>

<br/>

## 6. 프로젝트 진행

- Jira를 활용한 일주일 단위 스프린트 관리
![image](https://user-images.githubusercontent.com/44861724/230248082-44748b63-b87a-40e5-9e4a-9e053d5abae6.png)
- Notion을 통한 산출물 정리
![image](https://user-images.githubusercontent.com/44861724/230247836-82bbef77-74c9-4cf8-bc5f-04768769b08a.png)

<br/>


## 7. 팀 소개


|이도연|김창영|나웅기|이수아|박승빈|
| :---: | :---: | :---: | :---: | :---: |
|Data<br/>Back-end<br/>|Front-end<br/>|Front-end<br/>|Dev-Ops<br/>Back-end|Data

<br/>
