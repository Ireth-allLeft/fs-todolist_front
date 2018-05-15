const { createElement } = require('react');
const TodoList = require('tasks/tasks');
const { div } = require('react-dom-factories');

const Main = () => div({ className: 'main' }, [
  createElement(TodoList, { key: 'listContainer' }),
]);

module.exports = Main;
