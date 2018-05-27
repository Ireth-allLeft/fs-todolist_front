const { div, h2, p, ul, li } = require('react-dom-factories');
const description = require('core/description.js');


const About = () => div({ className: 'about' }, [
  h2({ className: 'about__header' }, 'Pink Panther\'s "to do list"'),
  p({ className: 'about__text' }, description.descriptionText.intro),
  ul({ className: 'about__instruction', key: 'task-instruction' }, description.descriptionText.instr, [
    li({ className: 'about__text' }, description.descriptionText.add),
    li({ className: 'about__text' }, description.descriptionText.priority),
    li({ className: 'about__text' }, description.descriptionText.edit),
    li({ className: 'about__text' }, description.descriptionText.done),
    li({ className: 'about__text' }, description.descriptionText.delete),
  ]),
]);


module.exports = About;
