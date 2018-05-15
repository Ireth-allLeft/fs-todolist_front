const { createElement } = require('react');
const { render } = require('react-dom');
const Main = require('main/main.js');

render(createElement(Main), document.getElementById('root'));

module.hot.accept();
