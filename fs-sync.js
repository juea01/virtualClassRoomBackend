const {readFileSync, writeFileSync} = require('fs');   //accessing readFileSync, writeFileSync method directly
const path = require('path');

const first = readFileSync(path.join('content','first.txt'),'utf-8');
const second = readFileSync(path.join('content','subfolder','text.txt'),'utf-8');

console.log(first, second);

writeFileSync(path.join('content','result-sync.txt'),`Here is result from first file appending: ${first}`,{flag: 'a'});