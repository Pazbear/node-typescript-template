#Dockerfile

#Base Image
FROM node:18-alpine

#디렉토리 설정
WORKDIR /app

#package.json을 우선적으로 복사
COPY package*.json ./

#패키지들을 설치해주고 캐쉬를 삭제
RUN yarn install && yarn cache clean

#나머지 앱 파일들 복사
COPY . .

#ts파일로 만들었기 때문에 js로 compile
RUN yarn run build