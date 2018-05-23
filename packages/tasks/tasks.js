const { createElement, Component } = require('react');
const { div, h2, input } = require('react-dom-factories');
const Task = require('task/task');
const AddTask = require('add-task/add-task');
const className = require('class-name/class-name');
const { responseStatuses } = require('core/constants');
const createRequest = require('core/create-request');
const Messages = require('messages/messages');
const locale = require('core/locale.js');


class TasksList extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      tasks: [],
      isLoading: true,
      messages: [],
    };

    this.addTask = this.addTask.bind(this);
    this.toggleTask = this.toggleTask.bind(this);
    this.togglePriority = this.togglePriority.bind(this);
    this.removeTask = this.removeTask.bind(this);
    // this.editText = this.editText.bind(this);
  }

  componentDidMount() {
    createRequest('fetchTasks').then((response) => {
      this.setState({ tasks: response.data || [], isLoading: false, messages: response.messages });
      console.log(response);
    });
  }

  addTask(text) {
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
  }

  toggleTask(id) {
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
  }

  togglePriority(event) {
    event.preventDefault();
    event.stopPropagation();
    const { tasks } = this.state;
    const id = event.currentTarget.dataset.taskId;
    let task = tasks.find((item) => item.id === id);

    function priority(item) {
      if (item.priorityColor === 'red') {
        return 'green';
      }
      return 'red';
    }
    this.setState({ isLoading: true });
    createRequest('updateTask', { id }, { priorityColor: priority(task) }).then((response) => {
      if (response.status === responseStatuses.OK) {
        task = Object.assign(task, response.data);
        this.setState({ tasks, isLoading: false, messages: response.messages });
      } else {
        this.setState({ isLoading: false, messages: response.messages });
      }
    });
  }

  removeTask(event) {
    event.preventDefault();
    event.stopPropagation();
    let { tasks } = this.state;
    const id = event.currentTarget.dataset.taskId;
    // const task = tasks.find((item) => item.id === id);

    this.setState({ isLoading: true });
    createRequest('deleteTask', { id }, { }).then((response) => {
      if (response.status === responseStatuses.OK) {
        // const itemIndex = tasks.indexOf(task);
        // tasks = tasks.slice(itemIndex, 1);
        tasks = tasks.filter((item)=> item.id !== id);

        this.setState({ tasks, isLoading: false, messages: response.messages });
      } else {
        this.setState({ isLoading: false, messages: response.messages });
      }
    });
  }

  // editText(event) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   const { tasks } = this.state;
  //   const id = event.currentTarget.dataset.taskId;
  //   let task = tasks.find((item) => item.id === id);
  //
  //
  //   createRequest('updateTask', { id }, { edit: true }).then((response) => {
  //     if (response.status === responseStatuses.OK) {
  //       task = Object.assign(task, response.data);
  //       this.setState({ tasks, isLoading: false, messages: response.messages });
  //     } else {
  //       this.setState({ isLoading: false, messages: response.messages });
  //     }
  //   });
  // }

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
        {
          className: className({
            name: 'tasks__list',
            mods: { loading: isLoading },
          }),
          key: 'list-active',
        },
        [
          h2({ className: 'tasks__title', key: 'title-active' }, 'In progress'),
        ],
        activeTasks.map((item) => createElement(Task, {
          item,
          toggleTask: this.toggleTask,
          togglePriority: this.togglePriority,
          removeTask: this.removeTask,
          key: item.id,
        })),
        createElement(AddTask, { addTask: this.addTask, key: 'addTask' }),
        activeTasks.length === 0 && !isLoading
          && div({ className: 'tasks_empty' }, locale.empty),

        !isLoading && messages.length > 0
          && createElement(Messages, { messages })
      ),
      div(
        { className: 'tasks__list', key: 'list-done' },
        [
          h2({ className: 'tasks__title', key: 'title-done' }, 'Done'),
        ],
        doneTasks.map((item) => createElement(Task, {
          item,
          toggleTask: this.toggleTask,
          togglePriority: this.togglePriority,
          removeTask: this.removeTask,
          key: item.id,
        }))
      ),
    ]);
  }
}


module.exports = TasksList;
