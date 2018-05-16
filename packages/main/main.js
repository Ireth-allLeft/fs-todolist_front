const { createElement } = require('react');
const TasksList = require('tasks/tasks');
const { div } = require('react-dom-factories');

const Main = () => div(
  { className: 'main' }, [
    div({ className: 'header', key: 'header' }, [
      div({ className: 'header__icon' }, 'To Do List'),
    ]),
  ],
  [
    createElement(TasksList, { key: 'listContainer' }),
  ]
);

module.exports = Main;
