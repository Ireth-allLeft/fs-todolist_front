const PropTypes = require('prop-types');
const { form, input, button } = require('react-dom-factories');


const propTypes = { addTask: PropTypes.func.isRequired };

const AddTask = ({ addTask }) => {
  let inputElement;

  const onSubmit = (event) => {
    event.preventDefault();

    if (!inputElement.value.trim()) {
      return;
    }
    addTask(inputElement.value);
    inputElement.value = '';
  };

  return form({ className: 'add-task', onSubmit }, [
    input({
      className: 'add-task__field task-field',
      type: 'text',
      id: 'text',
      placeholder: 'New task',
      ref: (el) => { inputElement = el; },
      key: 'input',
    }),
    button({ className: 'button add-task__button', type: 'submit', key: 'button' }, ['Add']),
  ]);
};

AddTask.propTypes = propTypes;

module.exports = AddTask;
