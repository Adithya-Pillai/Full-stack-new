const express = require('express');
const morgan = require('morgan');
const mongoose=require('mongoose');
const User=require('./models/User');
const Data=require('./models/Data');
// express app
const app = express();
const dbURI = 'mongodb+srv://adhi:adhi@cluster0.ikkoayt.mongodb.net/NGO_Website?retryWrites=true&w=majority&appName=Cluster0';


mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(morgan('dev')); // Morgan for logging
app.use(express.static('public')); // Serving static files
app.use(express.urlencoded({extended:false}))
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/sign-up', (req, res) => {
  res.render('sign-up',{result:{},passcorrect:''});
});

app.post('/sign-up', async (req, res) => {
  const check = await User.findOne({ Username: req.body.username });
  const email = await User.findOne({ Email_Id: req.body.email_id });
  if (check) {
    if (check.Password === req.body.password) {
      res.render('donate', { result: check });
    } else {
      res.render('sign-up',{ passcorrect:'Password incorrect',result:check });
    }
  }else if(email){
    res.render('sign-up',{ passcorrect:'Email already exists',result:{}});
  }
   else {
    const data = {
      Username: req.body.username,
      Password: req.body.password,
      Email_Id: req.body.email_id,
      PhoneNo: req.body.phone,
      Type: req.body.type,
      Subscribed: req.body.subscription
    };
    await User.insertMany(data);
    res.render('donate', { result: data });
  }
});

app.get('/donate', (req, res) => {
  res.render('donate',{result:{},passcorrect:''});
});

app.post('/donate', async (req,res) => {
  const data = {
    Name: req.body.fname,
    Email_Id: req.body.email_id,
    PhoneNo: req.body.phone,
    Type: req.body.donor_type,
    Address: req.body.address,
    Amount: req.body.amt,
    Payment: req.body.payment_method
  };
  await Data.insertMany(data);
  res.redirect('/');
});


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/ourworks', (req, res) => {
  res.render('ourworks');
});
app.get('/aboutus', (req, res) => {
  res.render('aboutus');
});
app.get('/sproduct1', (req, res) => {
  res.render('sproduct1');
});
app.get('/sproduct2', (req, res) => {
  res.render('sproduct2');
});
app.get('/sproduct3', (req, res) => {
  res.render('sproduct3');
});
app.get('/sproduct4', (req, res) => {
  res.render('sproduct4');
});
app.get('/sproduct5', (req, res) => {
  res.render('sproduct5');
});
app.get('/sproduct6', (req, res) => {
  res.render('sproduct6');
});
app.get('/sproduct7', (req, res) => {
  res.render('sproduct7');
});
app.get('/sproduct8', (req, res) => {
  res.render('sproduct8');
});


app.get('/projects', (req, res) => {
  res.render('projects');
});
app.get('/getinvolved', (req, res) => {
  res.render('getinvolved');
});


// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});