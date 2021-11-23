const http = require('http');

const server = http.createServer((req,res)=>{
    
    if(req.url === '/'){
        res.end('This is home page');
    }
    
    if(req.url === '/about'){
        res.end('Here is our short history');
    }

    res.end(`
    <h1>Opps</h1>
    <p>We can't seem to find the page </p>
    `);
    
});


server.listen(5000);