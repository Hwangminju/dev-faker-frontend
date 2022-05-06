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

### 6. Router 설치
```
$ npm i vue-router@next --save
```

### 7. vuetify 설치
```
$ vue add vuetify

? Choose a preset: 
  Configure (advanced) 
  Default (recommended) 
  Vite Preview (Vuetify 3 + Vite) 
  Prototype (rapid development) 
❯ Vuetify 3 Preview (Vuetify 3) 
```
vue3 참고
- https://velog.io/@kdeun1/Vue-3-Composition-API-TypeScript-Vuex-4로-프로젝트-구성하기
- https://sunny921.github.io/posts/vuejs-router-02/

### 8. Github Pages 연동
https://codingapple.com/unit/vue-build-and-deploy-with-github-pages/

### 9. 빌드 결과물 Github Pages로 띄우기
1. npm run build 수행
2. dist 폴더 생성되면, dist 폴더 안의 모든 파일들을 Github Pages용 레파지토리에 업로드
(https://github.com/Hwangminju/Hwangminju.github.io)
4. 약 2~3분 기다리면 Github Pages에 반영된 것 확인 가능
(https://hwangminju.github.io)

### 10. localstorage에 값 저장하기 (vuex-persistedstate)
1) vuex-persistedstate 설치
```
npm install vuex-persistedstate
```

2) store 수정
store/index.js에 import createPersistedState from 'vuex-persistedstate'; 추가

### [참고]

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
