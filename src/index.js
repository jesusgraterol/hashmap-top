import hashmapFactory from './modules/hashmap.js';

const hashmap = hashmapFactory();

hashmap.set('Jesus', 'Developer');
console.log(hashmap.has('Jesus'));
hashmap.remove('Jesus');
console.log(hashmap.has('Jesus'));
