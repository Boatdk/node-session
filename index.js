var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var session = require('express-session')
var PORT = 8080

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(bodyParser())
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 },
   resave : false, saveUninitialized: false }))

app.get('/', (req, res) => {
  var email = req.session.email
  if(email){
    res.render('admin', {email})
  }else{
    res.render('login')
  }
})

app.get('/admin', (req, res) => {
  if(req.session.email){
    res.render('admin')
  }else{
    res.write('<h1>Please Login first</h1>')
    res.write('<a href="/">login</a>')
    res.end()
  }
})

app.post('/admin', (req, res) => {
  var body = req.body
  var password = body.password
  var email = body.email
  console.log('email', email)
  console.log('password', password)
  if(email != '240311' && password != '240311'){
    res.render('login')
  }else{
    console.log('keep session', email)
    req.session.email = email
    res.render('admin', {email})
  }
})

app.get('/logout',(req,res)=>{
  req.session.destroy((err)=>{
     res.redirect('/')
  })
})

app.listen(PORT,()=>{
  console.log("running : " + PORT)
});