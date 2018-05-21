const { createElement } = require('react');
const Router = require('react-router-dom').BrowserRouter;
const { Route, Link } = require('react-router-dom');
const TasksList = require('tasks/tasks');
const About = require('about/about');
const { div } = require('react-dom-factories');

// const Main = () => div(
//   { className: 'main' }, [
//     div({ className: 'header', key: 'header' }, [
//       div({ className: 'header__icon', key: 'header-icon' }, 'To Do List'),
//     ]),
//   ],
//   [
//     createElement(TasksList, { key: 'listContainer' }),
//   ]
// );

const Main = () => createElement(
  Router, { key: 'router' },
  div({ className: 'main' }, [
    div({ className: 'header', key: 'header' }, [
      div({ className: 'header__icon', key: 'header-icon' }, 'To Do List'),
      createElement(Link, { to: '/', className: 'link', key: 'main' }, 'main'),
      createElement(Link, { to: '/about', className: 'link', key: 'about' }, 'about'),
    ]),

    createElement(Route, { path: '/', exact: true, component: TasksList, key: 'task-page' }),
    createElement(Route, { path: '/about', component: About, key: 'about-page' }),
  ])

);


module.exports = Main;
