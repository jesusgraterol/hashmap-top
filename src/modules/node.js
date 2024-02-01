
/**
 * Node Factory
 * Class in charge of implementing a Node that is used inside of LinkedLists.
 */
const nodeFactory = (key, value, nextNode = null) => ({
  key,
  value,
  nextNode,
});




/**
 * Module Exports
 */
export default nodeFactory;
