# A minimal React/Express starter project setup
## 1. NPM packages to install
#### Essential install
Install React, Webpack, Jest/Enzyme testing, dotenv, and Express for node. See appendix below for descriptions.
```
npm i --save react react-dom express
npm i --save-dev webpack webpack-cli babel-core babel-loader babel-preset-env babel-preset-react babel-plugin-transform-object-rest-spread jest jest-enzyme enzyme enzyme-adapter-react-16 dotenv
```
#### Optional install
Install the linter ESLint configured with Airbnb's rules.
```
npx install-peerdeps --dev eslint-config-airbnb
npm i --save-dev eslint-loader babel-eslint
```
> The npx command above is a node > 5.0 shortcut installing peerdeps for eslint-config-airbnb@latest: `npm install eslint-config-airbnb@17.0.0 eslint@^4.19.1 eslint-plugin-import@^2.12.0 eslint-plugin-jsx-a11y@^6.0.3 eslint-plugin-react@^7.9.1 --save-dev`
## 2. Package.json property additions
Add each of these properties to your package.json file.
#### babel
```JSON
"babel": {
"presets": [ "env", "react" ],
"plugins": [ "transform-object-rest-spread” ]
}
```
#### eslint
```JSON
"eslintConfig”: { 
"extends": "airbnb” 
}
```
#### jest
```JSON
"jest": { 
"setupFiles": ["./client/spec/setupTestFiles.js"]
}
```
#### scripts
```JSON
"scripts": {
"build": "webpack -d --watch",
"test": "jest",
"start": "nodemon server/index.js"
}
```
## 3. Webpack.config.js
Configure your webpack file to this.
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
## 4. Jest setupTestFiles.js
Configure your jest setup file like this.
```javascript
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shalow;
global.render = render;
global.mount = mount;

```
## 5. Index.html
Configure your index.html file like this.
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
  <div id="app">This should disappear if you hook up React.</div>
  <script type="text/javascript" src="client-bundle.js"></script>
</body>
</html>
```
## 6. Folder structure
Configure your folder structure like this.
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
You're all minimally set up now.

## Appendix: NPM packages explained
#### Front end libraries/frameworks: Essential
Pkg. | Desc.
--- | ---
react | A JavaScript library for building user interfaces.
react-dom | The entry point of the DOM-related rendering paths, intended to be paired with the isomorphic React.
#### Front end bundling: Essential
Pkg. | Desc.
--- | ---
webpack | A bundler for Javascript module files for usage in a browser.
babel-core | The Babel compiler core—Babel converts ECMAScript 2015+ code into a backwards compatible version of JavaScript in old browsers or environments.
babel-loader | Webpack plugin for Babel.
babel-preset-env | A Babel preset that compiles ES2015+ down to ES5 by automatically determining the Babel plugins and polyfills you need based on your targeted browser or runtime environments. Without any configuration options, babel-preset-env behaves exactly the same as babel-preset-latest (or babel-preset-es2015, babel-preset-es2016, and babel-preset-es2017 together).
babel-preset-react | Converts JSX syntax and strips out type annotations.
babel-plugin-transform-object-rest-spread | Allows Babel to transform rest properties for object destructuring assignment and spread properties for object literals.
#### Front end bundling: optional
Pkg. | Desc.
--- | ---
html-webpack-plugin | 
html-loader | 
css-loader | 
mini-css-extract-plugin | 
#### Linting: optional
Pkg. | Desc.
--- | ---
eslint-config-airbnb | Airbnb's .eslintrc as an extensible shared config.
eslint (a dependency) | A popular linter.
eslint-plugin-import (a dependency) | Supports linting of ES2015+ (ES6+) import/export syntax, and prevent issues with misspelling of file paths and import names.
eslint-plugin-jsx (a dependency) | JSX specific linting rules for ESLint.
eslint-plugin-react (a dependency) | React specific linting rules for ESLint.
eslint-loader | ESLint loader for webpack. When using with transpiling loaders (like babel-loader), make sure they are in correct order (bottom to top, e.g., use: ["babel-loader", "eslint-loader” ]). Otherwise files will be checked after being processed by babel-loader.
babel-eslint | It allows you to lint ALL valid Babel code with the fantastic ESLint. You only need to use it if you are using types (Flow) or experimental features not supported in ESLint itself yet. Otherwise try the default parser (you don't have to use it just because you are using Babel).
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