# dev-faker-frontend
KT caravan dev-faker Frontend Project

### Vue3 개발환경 구성하기
#### 1. node 설치
```
$ node -v
v16.14.2
```
#### 2. Vue CLI 설치
```
$ npm install -g @vue/cli
(permission error가 발생하면 sudo로 실행)
```
아래 명령어로 vue 설치 확인
```
$ vue -V
@vue/cli 5.0.4
```
### 3. Vue 프로젝트 구성
```
$ vue create dev-faker

(Vue 버전을 선택하는 항목에서 반드시 Vue 3 선택!
? Please pick a preset: (Use arrow keys)
❯ Default ([Vue 3] babel, eslint)
  Default ([Vue 2] babel, eslint)
  Manually select features
```

### 4. 프로젝트 폴더 확인
```
아래 내용 나오면 프로젝트 잘 생성됬는지 확인
🎉  Successfully created project dev-faker.
👉  Get started with the following commands:

 $ cd dev-faker
 $ npm run serve
```

### 5. VS Code에서 프로젝트 오픈
```
npm 라이브러리 설치/업데이트
$ npm install

npm 로컬서버 실행
$ npm run serve

> dev-faker@0.1.0 serve
> vue-cli-service serve

INFO  Starting development server...
App running at:
- Local:   http://localhost:8080/
```
