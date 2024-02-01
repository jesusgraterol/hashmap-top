import nodeFactory from './node.js';
import linkedListFactory from './linked-list.js';

/**
 * HashMap Factory
 * Module in charge of implementing the HashMap|HashTable Data Structure.
 */
const hashmapFactory = () => {
  /* *******************
   * MODULE PROPERTIES *
   ******************* */

  // the total number of Buckets the HashMap will start with
  const __CAPACITY = 16;

  // the factor that determines when it's time to grow the buckets
  const __LOAD_FACTOR = 0.75;

  // the list of buckets that will be used by the HashMap
  let __buckets = Array.from({ length: __CAPACITY }, () => linkedListFactory());

  // the total size (length) of the hashmap
  let __size = 0;




  /* **************
   * MISC HELPERS *
   ************** */

  /**
   * Converts any string into an integer.
   * @param {*} stringValue
   * @returns number
   */
  const __stringToNumber = (stringValue) => {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < stringValue.length; i += 1) {
      hashCode += primeNumber * hashCode + stringValue.charCodeAt(i);
    }
    return hashCode;
  };

  /**
   * Hashes a given key and returns the index of the bucket it goes into
   * @param {*} key
   * @returns number
   */
  const __hash = (key) => __stringToNumber(key) % __buckets.length;

  /**
   * Checks if a provided index is valid. Otherwise, it throws an error.
   * @param {*} index
   */
  const __isIndexOutOfBounds = (index) => {
    if (index < 0 || index >= __buckets.length) {
      throw new Error(`The provided index ${index} is invalid. The current size of the list is: ${__size}`);
    }
  };

  /**
   * Verifies if the buckets are too full and need to grow.
   * @returns boolean
   */
  const __hasHighLoad = () => (__size / __buckets.length) > __LOAD_FACTOR;

  /**
   * Identifies the bucket a given key belongs to.
   * @param {*} key
   * @returns number
   */
  const __getIndexOfKey = (key) => {
    // calculate the bucket the given key belongs to
    const index = __hash(key);

    // ensure the index is valid
    __isIndexOutOfBounds(index);

    // if valid, return it
    return index;
  };

  /**
   * Retrives the bucket that contains the given key.
   * @param {*} key
   * @returns LinkedList
   */
  const __getBucketOfKey = (key) => __buckets[__getIndexOfKey(key)];

  /**
   * Searches for a node within a bucket for a given key and a custom callback.
   * @param {*} key
   * @param {?} callback
   * @returns Node|null
   */
  const __getNodeByKeyWithCallback = (key, callback = () => true) => {
    // retrieve the bucket that contains the key
    const bucket = __getBucketOfKey(key);
    if (!bucket) return null;

    // find the required node
    const node = bucket.search(
      (currentNode, index) => (
        currentNode.key === key ? callback(currentNode, index, bucket) : null
      ),
    );

    // return the node if any
    return node;
  };

  /**
   * Puts together all the existing nodes for each existing bucket.
   * @param {*} callback
   * @returns Node[]
   */
  const __collect = (callback) => {
    const result = [];
    __buckets.forEach((bucket) => {
      bucket?.search((currentNode) => {
        if (currentNode.key) result.push(callback(currentNode));
      });
    });
    return result;
  };





  /* *********
   * ACTIONS *
   ********* */

  /**
   * Sets a given key valur pair into the hashmap.
   * @param {*} key
   * @param {*} value
   */
  const set = (key, value) => {
    // check if the node exists. If so, override it
    const node = __getNodeByKeyWithCallback(key);
    if (node) {
      node.value = value;
      return;
    }

    // identify the bucket that will hold the node and append it
    const index = __getIndexOfKey(key);
    __buckets[index].append(nodeFactory(key, value));
    __size += 1;

    // check if the buckets need to be resized
    if (__hasHighLoad()) {
      // create a copy of the existing buckets
      const oldBuckets = __buckets;

      // create a new bucket array by doubling the previous size
      __buckets = Array.from({ length: __buckets.length * 2 }, () => linkedListFactory());
      __size = 0;

      oldBuckets.forEach((bucket) => bucket.search((nodeVal) => set(nodeVal.key, nodeVal.value)));
    }
  };

  /**
   * Retrieves a node based on a given key.
   * @param {*} key
   * @returns Node|null
   */
  const get = (key) => __getNodeByKeyWithCallback(key);

  /**
   * Verifies if the hashmap contains a given key.
   * @param {*} key
   * @returns boolean
   */
  const has = (key) => __getNodeByKeyWithCallback(key) !== null;

  /**
   * Removes a given node based on a given key (if found).
   * @param {*} key
   * @returns boolean
   */
  const remove = (key) => __getNodeByKeyWithCallback(key, (_, i, bucket) => {
    bucket.remove(i);
    __size -= 1;
    return true;
  });

  /**
   * Restores the HashMap to a pristine state.
   */
  const clear = () => {
    __buckets = Array.from({ length: __CAPACITY }, () => linkedListFactory());
    __size = 0;
  };

  /**
   * Retrieves the list of existing keys.
   * @returns string[]
   */
  const keys = () => __collect((node) => node.key);

  /**
   * Retrieves the list of existing values.
   * @returns any[]
   */
  const values = () => __collect((node) => node.value);

  /**
   * Retrieves the list of existing entries in array format
   * @returns Array<[key: string, value: any]>
   */
  const entries = () => __collect((node) => [node.key, node.value]);


  /* **************
   * MODULE BUILD *
   ************** */
  return Object.freeze({
    get length() {
      return __size;
    },
    get buckets() {
      return __buckets;
    },
    set,
    get,
    has,
    remove,
    clear,
    keys,
    values,
    entries,
  });
};




/**
 * Module Exports
 */
export default hashmapFactory;
