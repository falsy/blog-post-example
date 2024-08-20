# 웹팩2 가볍게 시작하기

## 1. 패키지 설정

### init
```
$ npm init
```

### 웹팩을 설치합니다.
웹팩은 2 버전 마지막 버전인 2.6.1 로 설치하겠습니다.
```
$ npm install webpack@2.6.1 --save-dev
```

### 웹팩 개발 서버를 설치합니다.
```
$ npm install webpack-dev-server --save-dev
```

### html-webpack-plugin 플러그인 설치
```
$ npm install html-webpack-plugin --save-dev
```

### 끝
```js
// 예시
// package.json
{
  "name": "cheolguso-webpack2",
  "version": "1.0.0",
  "description": "웹팩2 연습",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "CHEOLGUSO",
  "license": "WTFPL",
  "devDependencies": {
    "html-webpack-plugin": "^2.30.1",
    "webpack": "^2.6.1",
    "webpack-dev-server": "^2.11.1"
  }
}
```

## 2. 웹팩 설정

### index.html 생성
```
$ vi index.html
```

```
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <title>cheolguso : webpack version2 guide</title>
  </head>
  <body>
    hello
  </body>
</html>
```

### index.js 생성
```
$ vi index.js
```

```js
document.write(' world');
```

### webpack.config.js 생성
```
$ vi webpack.config.js
```

```js
'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function makeWebpackConfig() {
  var config = {};
  
  config.entry = {
    app: './index.js',
  };

  config.output = {
    path: __dirname + '/build',
    filename: 'cheolguso.bundle.js'
  };

  config.devtool = 'eval-source-map';

  config.module = {};

  config.plugins = [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body'
    })
  ];

  return config;
}();
```

## 3. npm 커맨드 수정 및 실행

### package.json 수정 
```js
// package.json
{
  "name": "cheolguso-webpack2",
  "version": "1.0.0",
  "description": "webpack version2 guide",
  "main": "index.js",
  "scripts": {
    "build": "webpack --bail --progress --profile",
    "server": "webpack-dev-server --history-api-fallback --inline --progress"
  },
  "author": "CHEOLGUSO",
  "license": "WTFPL",
  "devDependencies": {
    "html-webpack-plugin": "^2.30.1",
    "webpack": "^2.6.1",
    "webpack-dev-server": "^2.11.1"
  }
}

```

### 개발 서버 실행 
```
$ npm run server
```

### 빌드
```
$ npm run build
```

## 4. 웹팹 설정에 관한 간단한 설명

### entry, output
위 예제에서는 이부분 입니다.
```js
...
config.entry = {
  app: './index.js',
};

config.output = {
  path: __dirname + '/build',
  filename: 'cheolguso.bundle.js'
};
...
```
entry는 몇가지 형태로 존재하는데, 그 이해를 위해선 output도 함께 보는 것이 좋습니다.

```js
// 1.
config.entry = './index.js';
config.output = {
  path: __dirname + '/build',
  filename: 'cheolguso.bundle.js'
}
```

```js
// 2.
config.entry = ['./index.js', './addScript.js'];
config.output = {
  path: __dirname + '/build',
  filename: 'cheolguso.bundle.js'
}
```

```js
// 3.
config.entry = {
  index : './index.js', 
  addScript : './addScript.js'
};
config.output = {
  path: __dirname + '/build',
  filename: '[name].bundle.js'
}
// 여기에서 [name]은 entry객체의 키값이 됩니다. (eg. index, addScript)
```

### devtool
```js
config.devtool = 'eval-source-map';
```

압축, 난독화, es6+ 의 트랜스파일 등의 작업들로 어려워지는 디버깅을 소스맵을 통해 조금 수월하게 할 수 있는 옵션으로 이미 여러가지 옵션이 있으며 플러그인을 통해 더 확장되는 것으로 보입니다.  
몇가지 대표적인 옵션에 대한 성능 태스트는 아래의 링크에서 잘 되어 있는 것 같습니다.
  
[참고링크 : https://perfectacle.github.io](https://perfectacle.github.io/2016/11/14/Webpack-devtool-option-Performance/)
  
개인적으로는 angular1 + babel을 사용한 프로젝트에서 `eval` 이 포함되지 않는 옵션은 알 수 없는 오류가 발생해서 실험해보지 못하였으며, 단순히 결과적으로 배포를 위한 번들을 만듦에 있어, `eval-source-map` 에서 2.7mb 였던 번들의 크기가 `eval`에서 830kb 로 줄어드는 것을 알 수 있었습니다.  


> 아직 정확한 옵션 하나 하나의 정확한 차이는 알 지 못합니다.
> 이후에 추가 작성할 예정입니다.


### module
```js
config.module = {
  rules: [{
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }
  }, {
    test: /\.less$/,
    use: [
      {loader: "style-loader"},
      {loader: "css-loader", options: {sourceMap: true}},
      {loader: "less-loader", options: {sourceMap: true}}
    ]
  }]
};
```

예를 들어 위와 같이 설정한다면, es6 -> es5로 less는 css 트랜스파일됩니다.
> `babel-loader, style-loader, css-loader, less-loader` 는 별도 설치

[참고링크 : https://webpack.js.org/configuration/module/](https://webpack.js.org/configuration/module/)

### plugins
```js
config.plugins = [
  new webpack.optimize.UglifyJsPlugin()
];
```

이름 그대로 플러그인을 설정합니다.  
UglifyJsPlugin 플러그인은 자바스크립트 코드를 압축해줍니다.

[참고링크 : https://webpack.js.org/configuration/plugins/](https://webpack.js.org/configuration/plugins/)


## 5. 마무리
인터넷 속에서 수 많은 글들을 참고하였지만, 그 중 몇가지 좋은 글을 링크로 남깁니다.

* [https://hyunseob.github.io/2017/03/21/webpack2-beginners-guide/](https://hyunseob.github.io/2017/03/21/webpack2-beginners-guide/)
* [http://dev-momo.tistory.com/entry/Webpack2-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0](http://dev-momo.tistory.com/entry/Webpack2-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0)
* [https://github.com/FEDevelopers/tech.description/wiki/Webpack2%EC%99%80-%EB%AA%A8%EB%93%88%EB%B2%88%EB%93%A4%EB%A7%81%EC%9D%84-%EC%9C%84%ED%95%9C-%EC%B4%88%EB%B3%B4%EC%9E%90-%EA%B0%80%EC%9D%B4%EB%93%9C](https://github.com/FEDevelopers/tech.description/wiki/Webpack2%EC%99%80-%EB%AA%A8%EB%93%88%EB%B2%88%EB%93%A4%EB%A7%81%EC%9D%84-%EC%9C%84%ED%95%9C-%EC%B4%88%EB%B3%B4%EC%9E%90-%EA%B0%80%EC%9D%B4%EB%93%9C)
* [https://github.com/FEDevelopers/tech.description/wiki/Webpack%EC%9D%98-%ED%98%BC%EB%9E%80%EC%8A%A4%EB%9F%B0-%EC%82%AC%ED%95%AD%EB%93%A4](https://github.com/FEDevelopers/tech.description/wiki/Webpack%EC%9D%98-%ED%98%BC%EB%9E%80%EC%8A%A4%EB%9F%B0-%EC%82%AC%ED%95%AD%EB%93%A4)
* [https://firejune.com/1798/%EC%B4%88%EB%B3%B4%EC%9E%90%EC%9A%A9+Webpack+%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC+%ED%8C%8C%ED%8A%B81+-+Webpack+%EC%9E%85%EB%AC%B8](https://firejune.com/1798/%EC%B4%88%EB%B3%B4%EC%9E%90%EC%9A%A9+Webpack+%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC+%ED%8C%8C%ED%8A%B81+-+Webpack+%EC%9E%85%EB%AC%B8)
* [http://blog.jeonghwan.net/js/2017/05/15/webpack.html](http://blog.jeonghwan.net/js/2017/05/15/webpack.html)

