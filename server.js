const express = require("express");
const hbs = require('hbs');
const fs = require("fs");


const port = process.env.PORT;
const ip = process.env.IP;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set("view engine", "hbs");


app.use((req, res, next) => {
   var now = new Date().toString();
   var log = `${now}: ${req.method} ${req.url}`;
   
   console.log(log);
   fs.appendFile('server.log', log + '\n', (err) =>{
       if(err){
           console.log('Unable to append to server.log');
       }
   });
   next();
    
});

app.use((req, res, next) => {
  res.render('maintenance', {
         pageTitle: 'Maintenance Page',
     });
    
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
   return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});

app.get("/", (req, res) =>{
  
    
    res.render('home',  {
         pageTitle: 'About Page',
         welcomeMessage: 'Hello there',
     });
});

app.get('/about', (req, res)=>{
     res.render('about', {
         pageTitle: 'About Page',
     });
});

app.get('/bad', (req, res)=>{

     res.send({
        erroMessage: 'Error'
    });
});

app.get('/help', (req, res)=>{
     res.render('help');
});

app.listen(port, ip, ()=>{
    console.log(`Server Start up on port ${port}`);
})