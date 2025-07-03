// mjs = module javascript

import A from './Module1.mjs' // This is default export of Module1.mjs
import { b } from './Module1.mjs' // This is named export of Module1.mjs

console.log("This is the value of A:", A);
console.log("This is the value of b:", b);
