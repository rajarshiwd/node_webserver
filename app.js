

const express = require ('express');
const app = express();
const hbs = require('hbs');
var fs = require('fs');
const port = process.env.PORT || 4200 ;

app.set('view engine','hbs');

//registering partial views
hbs.registerPartials(__dirname +'/views/partials');

//registering Helper functions
hbs.registerHelper('currentYear',()=>{
  return new Date().getFullYear();
})


// middleware to print the log
app.use((req,res,next) =>{

  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('serverLog',log+'/n',(error)=>{
    if(error){
      console.log(error);
    }
  });
  next();
});
// // middleware
// app.use((req,res)=>{
//   res.render('maintainence.hbs')
// })

// middleware to use files in other folders
app.use(express.static(__dirname +'/public'));

app.get('/projects',(req,res)=>{
  res.render('projects.hbs',{
    page:'Projects page'
  })
})


app.get('/',(request,response)=>{
response.render('home.hbs',{
  page:'Home Page',

});
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    page:'About Page',
    date: new Date().getFullYear()
  })
})
app.listen(port,()=>{
  console.log(`The localhost is listening at ${port}`);
});
