const PropTypes = require('prop-types');
const { div, time } = require('react-dom-factories');
const className = require('class-name/class-name');


const propTypes = {
  item: PropTypes.object.isRequired,
  toggleTask: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
};
function priority(item) {
  if (item.priorityColor === 'red') {
    return true;
  }
  return false;
}


function timeConverter(item) {
  const a = new Date(item);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  const convertTime = `${date} ${month} ${year} ${hour}:${min}:${sec}`;
  return convertTime;
}

function requiredTime(item) {
  return Date.now();
}

const Task = ({ item, toggleTask, togglePriority, removeTask, editText, setNewTaskText }) => div(
  {
    className: className({ name: 'task', mods: { done: item.isCompleted } }),
    onClick: toggleTask.bind(null, item.id),
  },
  [
    div({
      className: className({ name: 'task__color', mods: { 'high-priority': priority(item) } }),
      onClick: togglePriority,
      'data-task-id': item.id,
      key: `${item.id}-color`,

    }),
  ],
  [
    time({
      className: 'task__added-time',
      key: item.addedDate,
    }, timeConverter(item.addedDate)),
  ],
  [
    div({
      className: 'text',
      onClick: editText,
      'data-task-id': item.id,
      'data-task-text': item.text,
      key: `${item.id}-text`,
    }, item.text),
  ],
  [
    div({
      className: 'delete-icon',
      onClick: removeTask,
      'data-task-id': item.id,
      key: `${item.id}-delete`,
    }),
  ]
);

Task.propTypes = propTypes;

module.exports = Task;
