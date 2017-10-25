const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

//Register the directory of the partial views
hbs.registerPartials(__dirname+'/views/partials');
//Configures handlebars as the view engine for express
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n', (err) =>{
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next)=>{
//   res.render('maintenance');
// });

app.use(express.static(__dirname+'/public'));

//Using the getCurrentYear in the footer
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});

app.get('/', (request, response)=>{
  // response.send('<h1>Hello Express!</h1>'); //send as the body of the response
  response.render('home.hbs',{
      pageTitle:'Home page',
      message:'Welcome to our express website!'
    }
  )
});

app.get('/about', (req,res) =>{
  res.render('about.hbs',{pageTitle:'About Page'});
});

app.get('/bad', (req,res) =>{
  res.send({
    errorMessage:'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
});
