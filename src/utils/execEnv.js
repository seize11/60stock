/* global window */
const canUseDOM = !!(
  typeof window !== 'undefined'
  && window.document
  && window.document.createElement
);

module.exports = {
  canUseDOM,
  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),
};
