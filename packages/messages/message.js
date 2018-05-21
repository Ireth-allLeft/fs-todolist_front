const React = require('react');
const PropTypes = require('prop-types');
const className = require('class-name/class-name');
const locale = require('core/locale');
const { div } = require('react-dom-factories');


const propTypes = { message: PropTypes.object };

const Message = ({ message }) => (
  div(
    { className: className({ name: 'message', mods: message.type }) },
    message.value || locale.messages[message.code] || locale.messages.DEFAULT_ERROR
  )
);

Message.propTypes = propTypes;

module.exports = Message;
