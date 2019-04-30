var diff = require('deep-diff').diff;
const data = {
  issue: 126,
  submittedBy: 'abuzarhamza',
  title: 'readme.md need some additional example prefilter',
  posts: [
    {
      date: '2018-04-16',
      text: `additional example for prefilter for deep-diff would be great.
      https://stackoverflow.com/questions/38364639/pre-filter-condition-deep-diff-node-js`
    }
  ]
};
 
const clone = JSON.parse(JSON.stringify(data));
clone.title = 'README.MD needs additional example illustrating how to prefilter';
clone.disposition = 'completed';
 
const two = diff(data, clone);
 
console.log(two)