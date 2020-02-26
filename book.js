var express = require('express');
var app = express();

app.get('/book', function(req, res){
   res.send(`<strong>Hello world</strong>
    <h1>Header</h1>
   `)
});

app.listen(8000);
