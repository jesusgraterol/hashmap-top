/* import nodeFactory from './node'; */

/**
 * LinkedList Factory
 * Class in charge of implementing the LinkedList Data Structure.
 */
const linkedListFactory = () => {
  /* *******************
   * MODULE PROPERTIES *
   ******************* */

  // the first item in the list
  let __head = null;

  // the last item in the list
  let __tail = null;

  // the total number of nodes within the list
  let __size = 0;



  /* **************
   * MISC HELPERS *
   ************** */

  /**
   * Ensures the provided index is valid based on the current state of the list. Throws an error
   * in case it isn't
   * @param {*} index
   * @returns boolean
   */
  const __validateIndex = (index) => {
    if (index < 0 || index >= __size) {
      throw new Error(`The provided index ${index} is invalid. The current size of the list is: ${__size}`);
    }
  };

  /**
   * Iterates until the last node based on the provided index has been found. If the list is empty
   * it will return null.
   * @param {*} index
   * @returns Node|null
   */
  const __getNodeAt = (index) => {
    let current = __head;
    let i = 0;
    while (current && i < index) {
      current = current.nextNode;
      i += 1;
    }
    return current;
  };





  /* *********
   * ACTIONS *
   ********* */

  /**
   * Appends a node to the list.
   * @param {*} node
   */
  const append = (node) => {
    // if the list is empty, add it to the head. Otherwise, add it to the tail
    if (!__head) {
      __head = node;
      __tail = node;
    } else {
      __tail.nextNode = node;
      __tail = node;
    }

    // increment the size
    __size += 1;
  };

  /**
   * Deletes a node from the list.
   * @param {*} index
   */
  const remove = (index) => {
    // ensure the index is valid
    __validateIndex(index);

    // delete the record based on the index
    if (index === 0) {
      __head = __head.nextNode;

      // if the size was 1, it means the list is now empty
      if (__size === 1) {
        __tail = null;
      }
    } else {
      // retrieve the previous node
      const prev = __getNodeAt(index - 1);

      // identify the node that will be removed
      const toBeRemoved = prev.nextNode;

      // delete the node by pointing the previous one to the next one
      prev.nextNode = toBeRemoved.nextNode;

      // if the deleted node was the last one in the list, set the new tail
      if (index === __size - 1) {
        __tail = prev;
      }
    }

    // decrement the size
    __size -= 1;
  };

  /**
   * Searches for a node by key by providing a custom callback func. If the node is not found, it
   * returns null.
   * @param {*} callback
   * @returns Node|null
   */
  const search = (callback) => {
    let i = 0;
    let current = __head;

    while (current) {
      if (callback(current, i)) {
        return current;
      }

      current = current.nextNode;
      i += 1;
    }

    return null;
  };


  /* **************
   * MODULE BUILD *
   ************** */
  return Object.freeze({
    // getters
    get size() {
      return __size;
    },

    // actions
    append,
    remove,
    search,
  });
};




/**
 * Module Exports
 */
export default linkedListFactory;
