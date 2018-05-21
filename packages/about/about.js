const { div, h2, p } = require('react-dom-factories');
const className = require('class-name/class-name');
const description = require('core/description.js');


const About = () => div({ className: 'about' }, [
  h2({ className: 'about__header' }, 'Something about "to do list"'),
  p({ className: 'about__text' }, description.descriptionText.intro),
  div({ className: 'task__color' }),
  div({ className: 'task__color task__color_high-priority' }),
  p({ className: 'about__text' }, description.descriptionText.priority),
]);


module.exports = About;
