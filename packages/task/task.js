const PropTypes = require('prop-types');
const { div, time } = require('react-dom-factories');
const className = require('class-name/class-name');


const propTypes = {
  item: PropTypes.object.isRequired,
  toggleTodo: PropTypes.func.isRequired,
};
function priority(item) {
  if (item.priorityColor === 'red') {
    return true;
  }
  return false;
}


function timeConverter(item) {
  const a = new Date(item.addedDate);
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


const TodoItem = ({ item, toggleTodo, togglePriority }) => div(
  {
    className: className({ name: 'task', mods: { done: item.isCompleted } }),
    onClick: toggleTodo.bind(null, item.id),
  },
  [
    div({
      className: className({ name: 'task__color', mods: { 'high-priority': priority(item) } }),
      onClick: togglePriority.bind(null, item.id),
    }),
  ],
  [
    time({ className: 'task__added-time', key: item.addedDate }, timeConverter(item)),
  ],
  item.text,
  [
    div({ className: 'delete-icon', key: `${item.id}-delete`/* , onClick: item.remove(item.id) */ }, []),

  ]
);

TodoItem.propTypes = propTypes;

module.exports = TodoItem;
