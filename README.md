# A minimal React/Express starter project setup
Here are six things to do to start a minimal React/Express web app from scratch.
1. Install your NPM packages.
2. Add properties to your package.json file.
3. Configure a proper folder structure.
4. Configure your webpack file.
5. Set up your Jest/Enzyme testing file.
6. Draft your index.html file.
## 1. NPM packages
#### Essential
Install React, Webpack, Jest/Enzyme testing, dotenv, and Express for node. See appendix below for descriptions.
```
npm i -P dotenv react react-dom express
npm i -D webpack webpack-cli babel-core babel-loader babel-preset-env babel-preset-react babel-preset-stage-2 jest jest-enzyme enzyme enzyme-adapter-react-16 dotenv
```
> September 9, 2018: Note that this starter repo version installs Babel 6, not the latest Babel 7 and related presets, plugins, and loaders. While there are updates for most, Jest continues to depend on Babel 6. We will update this starter repo when all packages properly work with Babel 7.
#### Optional
Install the linter ESLint configured with Airbnb's rules.
```
npx install-peerdeps --dev eslint-config-airbnb
npm i --D eslint-loader eslint-plugin-ejs babel-eslint
```
> The npx command above is an npm 5+ shortcut installing required peer dependencies for eslint-config-airbnb@latest: `npm i eslint-config-airbnb@17.0.0 eslint@^4.19.1 eslint-plugin-import@^2.12.0 eslint-plugin-jsx-a11y@^6.0.3 eslint-plugin-react@^7.9.1 -D`
## 2. Package.json
Add jest, babel, eslint, and custom script properties to your package.json file.
#### jest, babel, eslint
```JSON
"jest": { 
  "setupFiles": ["./client/spec/setupTestFiles.js"]
},
"babel": {
  "presets": [ "env", "react", "stage-2" ]
},
"eslintConfig": { "extends": "airbnb" },
```
#### scripts
```JSON
"scripts": {
  "build": "webpack -d",
  "serve": "node server/index.js",
  "start": "npm run build && npm run serve",
  "build-dev": "webpack -d --watch",
  "serve-dev": "nodemon server/index.js",
  "start-dev": "npm run build-dev & npm run serve-dev",
  "test": "jest"
},
```
> If you do not have nodemon globally installed, `npm i -g nodemon`
## 3. Folder structure
Configure your folder structure like this:
```
.
├── client
│   ├── spec
│       ├── __tests__
│   	    ├── App.test.jsx
│   	    ├── ...
│       ├── setupTestFiles.js	 	
│   ├── src
│       ├── components
│   	     ├── App.jsx
│   	     ├── ...
│   	├── index.jsx	 	
├── database
│   ├── ...
├── public
│   ├── ...
│   ├── index.html
├── server
│   ├── ...          							
│   ├── index.js          				
├── .env
├── .gitignore
├── ...
└── webpack.config.js
```
## 4. Webpack.config.js
Configure your minimal webpack file.
```javascript
const path = require('path');
const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/public');

module.exports = {
  mode: 'development',
  entry: {
    client: `${SRC_DIR}/index.jsx`,
  },
  output: {
    path: DIST_DIR,
    filename: '[name]-bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'cheap-eval-source-map',
};

```
## 5. Jest setupTestFiles.js
Set up your jest test file.
```javascript
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;

```
## 6. Index.html
Draft your index.html file ensuring a proper div id referenced in your index.jsx and a proper script source referenced in your webpack config. file.
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Your Website Name</title>
</head>
<body>
  <div id="app"></div>
  <script type="text/javascript" src="client-bundle.js"></script>
</body>
</html>

```
You're all minimally set up now.

## Appendix: NPM packages explained
#### Front-end libraries/frameworks: Essential
Pkg. | Desc.
--- | ---
react | A JavaScript library for building user interfaces.
react-dom | The entry point of the DOM-related rendering paths, intended to be paired with the isomorphic React.
#### Front-end bundling: Essential
Pkg. | Desc.
--- | ---
webpack | A bundler for Javascript module files for usage in a browser.
babel-core | The Babel compiler core—Babel converts ECMAScript 2015+ code into a backwards compatible version of JavaScript in old browsers or environments.
babel-loader | Webpack plugin for Babel.
babel-preset-env | A Babel preset that compiles ES2015+ down to ES5 by automatically determining the Babel plugins and polyfills you need based on your targeted browser or runtime environments. Without any configuration options, babel-preset-env behaves exactly the same as babel-preset-latest (or babel-preset-es2015, babel-preset-es2016, and babel-preset-es2017 together).
babel-preset-react | Converts JSX syntax and strips out type annotations.
babel-plugin-preset-stage-2 | A Babel preset that includes all ECMAScript TC39 Stage 3 and 2 proposals, including the plugins transform-rest properties and transform-class-properties.
#### Front-end bundling: optional
Pkg. | Desc.
--- | ---
css-loader | 
style-loader | 
mini-css-extract-plugin | 
html-webpack-plugin | 
html-loader | 
#### Testing: Essential
Pkg. | Desc.
--- | ---
jest | Delightful JavaScript Testing.
jest-enzyme | To properly use Jest with Enzyme.
enzyme | JavaScript Testing utility for React.
enzyme-adapter-react-16 | An Adapter corresponding to the version of react you are using.
#### Environment variables: Essential
Pkg. | Desc.
--- | ---
dotenv | A zero-dependency module that loads environment variables from a .env file into process.env.
dotenv-webpack | A dotenv plugin for webpack.
#### Server: Essential
Pkg. | Desc.
--- | ---
express | A fast, unopinionated, minimalist web framework for node.
#### Linting: Optional
Pkg. | Desc.
--- | ---
eslint-config-airbnb | Airbnb's .eslintrc as an extensible shared config.
eslint | A popular linter.
eslint-plugin-import | Supports linting of ES2015+ (ES6+) import/export syntax, and prevent issues with misspelling of file paths and import names.
eslint-plugin-jsx | JSX specific linting rules for ESLint.
eslint-plugin-react | React specific linting rules for ESLint.
eslint-loader | ESLint loader for webpack. When using with transpiling loaders (like babel-loader), make sure they are in correct order (bottom to top, e.g., use: ["babel-loader", "eslint-loader” ]). Otherwise files will be checked after being processed by babel-loader.
eslint-plugin-ejs | Parses out ejs declarations found in js and jsx files.
babel-eslint | It allows you to lint ALL valid Babel code with the fantastic ESLint. You only need to use it if you are using types (Flow) or experimental features not supported in ESLint itself yet. Otherwise try the default parser (you don't have to use it just because you are using Babel).
