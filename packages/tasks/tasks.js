const { createElement, Component } = require('react');
const { div, h2 } = require('react-dom-factories');
const TodoItem = require('task/task');
const AddTodo = require('add-todo/add-todo');
const className = require('class-name/class-name');
const { responseStatuses } = require('core/constants');
const createRequest = require('core/create-request');
const Messages = require('messages/messages');
const locale = require('core/locale.js');


class TodoList extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      tasks: [],
      isLoading: true,
      messages: [],

    /* todos: [
        {
          id: '100001',
          text: '1 задача',
          isCompleted: false,
          priorityColor: 'red',
          addedDate: 1525962102,
        },
        {
          id: '100002',
          text: '2 задача',
          isCompleted: true,
          priorityColor: 'green',
          addedDate: 1525962102,
        },
        {
          id: '100003',
          text: '3 задача',
          isCompleted: true,
          priorityColor: 'red',
          addedDate: 1525962102,
        },
        {
          id: '100004',
          text: '4 задача',
          isCompleted: false,
          priorityColor: 'red',
          addedDate: 1525962102,
        },
        {
          id: '100005',
          text: '5 задача',
          isCompleted: false,
          priorityColor: 'green',
          addedDate: 1525962102,
        },
      ], */

    };

    this.addTodo = this.addTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
  }

  componentDidMount() {
    createRequest('fetchTasks').then((response) => {
      this.setState({ tasks: response.data || [], isLoading: false, messages: response.messages });
    });
  }

  addTodo(text) {
    const { tasks } = this.state;

    this.setState({ isLoading: true });
    createRequest('addTask', {}, { text }).then((response) => {
      if (response.status === responseStatuses.OK) {
        tasks.push(response.data);
        this.setState({ tasks, isLoading: false, messages: response.messages });
      } else {
        this.setState({ isLoading: false, messages: response.messages });
      }
    });
    /*
    const { todos } = this.state;

    const lastTodoId = todos[todos.length - 1].id;
    const id = Number(lastTodoId) + 1;
    todos.push({ id: String(id), text, isCompleted: false });

    this.setState({ todos }); */
  }

  toggleTodo(id) {
    const { tasks } = this.state;
    let task = tasks.find((item) => item.id === id);

    this.setState({ isLoading: true });
    createRequest('updateTask', { id }, { isCompleted: !task.isCompleted }).then((response) => {
      if (response.status === responseStatuses.OK) {
        task = Object.assign(task, response.data);
        this.setState({ tasks, isLoading: false, messages: response.messages });
      } else {
        this.setState({ isLoading: false, messages: response.messages });
      }
    });

    /*  const { todos } = this.state;

    const todo = todos.find((item) => item.id === id);
    todo.isCompleted = !todo.isCompleted;
*/
    this.setState({ tasks });
  }

  togglePriority(id) {
    const { tasks } = this.state;

    const priority = tasks.find((item) => item.id === id);
    let color = priority.priorityColor;
    if (color === 'red') {
      color = 'green';
    } else {
      color = 'red';
    }

    this.setState({ tasks });
  }

  render() {
    const { tasks, isLoading, messages } = this.state;
    const activeTasks = tasks.filter((item) => {
      return !item.isCompleted;
    });
    const doneTasks = tasks.filter((item) => {
      return item.isCompleted;
    });

    return div({ className: 'tasks' }, [
      div(
        { className: 'tasks__list', key: 'list-active' },
        [
          h2({ className: 'tasks__title', key: 'title-active' }, 'In progress'),
        ],
        activeTasks.map((item) => createElement(TodoItem, {
          item,
          toggleTodo: this.toggleTodo,
          togglePriority: this.togglePriority,
          key: item.id,
        })),
        createElement(AddTodo, { addTodo: this.addTodo, key: 'addTodo' }),

        messages.length === 0 && !isLoading
          && div({ className: 'tasks_empty' }, locale.empty),

        !isLoading && messages.length > 0
          && Messages({ messages })
      ),
      div(
        { className: 'tasks__list', key: 'list-done' },
        [
          h2({ className: 'tasks__title', key: 'title-done' }, 'Done'),
        ],
        doneTasks.map((item) => createElement(TodoItem, {
          item,
          toggleTodo: this.toggleTodo,
          togglePriority: this.togglePriority,
          key: item.id,
        }))
      ),
    ]);
  }

/*  remove(id) {
    const { tasks, isLoading } = this.state;
    const itemToDelete = tasks.find((item) => item.id === id);
    const itemIndex = tasks.indexOf(itemToDelete);
    tasks.slice(itemIndex, 1);
  } */
}


module.exports = TodoList;
