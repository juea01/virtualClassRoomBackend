const {readFile, writeFile} = require('fs');   //accessing readFile, writeFile method directly
const path = require('path');

readFile(path.join('content','first.txt'),'utf-8',(err, result)=> {
    if(err) {
        console.log(err);
        return;
    }
    console.log(result);
    
    writeFile(path.join('content','result-async.txt'),result, (err,result)=>{
        if(err) {
            console.log(err);
            return;
        } 
        console.log(result);
    });
})

