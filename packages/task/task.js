const PropTypes = require('prop-types');
const { div, time, form, input, button } = require('react-dom-factories');
const className = require('class-name/class-name');
const { Component } = require('react');
const moment = require('moment');

const propTypes = {
  item: PropTypes.object.isRequired,
  toggleTask: PropTypes.func.isRequired,
  togglePriority: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
  editText: PropTypes.func.isRequired,
};

function priority(item) {
  return item.priorityColor === 'red';
}

function timeConverter(item) {
  const convertTime = moment(item).format('YYYY MMMM DD, HH:mm:ss');
  return convertTime;
}

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = { isEdit: false };
    this.editStart = this.editStart.bind(this);
    this.editEnd = this.editEnd.bind(this);
  }

  editStart(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.props.item.isCompleted) {
      this.setState({ isEdit: true });
    }
  }

  editEnd(text) {
    this.props.editText(text, this.props.item.id);
    this.setState({ isEdit: false });
  }

  render() {
    let inputElement;

    const onSubmit = (event) => {
      event.preventDefault();

      if (!inputElement.value.trim()) {
        inputElement.value = this.props.item.text;
      } else {
        this.editEnd(inputElement.value);
        inputElement.value = '';
      }
    };

    return div(
      {
        className: className({
          name: 'task',
          mods: { done: this.props.item.isCompleted },
        }),
        onDoubleClick: this.props.toggleTask.bind(null, this.props.item.id),
      },
      [
        div({
          className: className({
            name: 'task__color',
            mods: { 'high-priority': priority(this.props.item) },
          }),
          onClick: this.props.togglePriority,
          'data-task-id': this.props.item.id,
          key: `${this.props.item.id}-color`,
        }),

        time(
          {
            className: 'task__added-time',
            key: this.props.item.addedDate,
          },
          timeConverter(this.props.item.addedDate)
        ),

        !this.state.isEdit
          && div(
            {
              className: 'text',
              onClick: this.editStart,
              key: `${this.props.item.id}-text`,
            },
            this.props.item.text
          ),

        this.state.isEdit
          && form(
            {
              className: 'edit-task',
              onSubmit,
              key: `${this.props.item.id}-input`,
            },
            [
              input({
                className: 'task-field edit-task__field',
                type: 'text',
                id: 'text',
                placeholder: this.props.item.text,
                ref: (el) => {
                  inputElement = el;
                },
                key: `${this.props.item.id}-input`,
              }),
              button(
                {
                  className: 'button',
                  type: 'submit',
                  key: `${this.props.item.id}-button`,
                },
                ['Edit']
              ),
            ]
          ),

        div({
          className: 'delete-icon',
          onClick: this.props.removeTask,
          'data-task-id': this.props.item.id,
          key: `${this.props.item.id}-delete`,
        }),
      ]
    );
  }
}

Task.propTypes = propTypes;

module.exports = Task;
