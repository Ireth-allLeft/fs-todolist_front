const PropTypes = require('prop-types');
const { form, input, button } = require('react-dom-factories');


const propTypes = { addTodo: PropTypes.func.isRequired };

const AddTodo = ({ addTodo }) => {
  let inputElement;

  const onSubmit = (event) => {
    event.preventDefault();

    if (!inputElement.value.trim()) {
      return;
    }
    addTodo(inputElement.value);
    inputElement.value = '';
  };

  return form({ className: 'add-task', onSubmit }, [
    input({
      className: 'add-task__field',
      type: 'text',
      id: 'text',
      placeholder: 'New task',
      ref: (el) => { inputElement = el; },
      key: 'input',
    }),
    button({ className: 'add-task__button', type: 'submit', key: 'button' }, ['Add']),
  ]);
};


/* form({ className: 'add-todo', onSubmit }, [
  label({ className: 'add-todo_label', htmlFor: 'text', key: 'label' }, locale.textLabel),
  input({
    className: 'add-todo_field',
    type: 'text',
    id: 'text',
    ref: (el) => { inputElement = el; },
    key: 'input',
  }),
  button({ className: 'add-todo_button', type: 'submit', key: 'button' }, locale.buttonLabel),
]); */
AddTodo.propTypes = propTypes;

module.exports = AddTodo;
