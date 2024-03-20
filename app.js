const express = require('express');
const morgan = require('morgan');
const mongoose=require('mongoose');
const body_parser = require('body-parser')
const crypto = require('crypto');
const app = express();
const Product=require('./models/Product');
const User=require('./models/User');
const Data=require('./models/Data');
const dbURI = 'mongodb+srv://adhi:adhi@cluster0.ikkoayt.mongodb.net/NGO_Website?retryWrites=true&w=majority&appName=Cluster0';
const session = require('express-session');
const { request } = require('http');

mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
// register view engine
app.set('view engine', 'ejs');
// middleware & static files
app.use(express.static('public')); // Serving static files
app.use(body_parser.urlencoded({extended:false}))
app.use(body_parser.json());
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


// Generate a random string of characters
function generateRandomString(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
      .toString('hex') // Convert to hexadecimal format
      .slice(0, length); // Trim to desired length
}

// Generate a random secret key
const secretKey = generateRandomString(32);
app.use(session({
secret: secretKey,
resave: false,
saveUninitialized: true,
cookie: {secure: false}
}));

app.get('/sproduct1', (req,res) => {
  Product.findOne({Id:req.query.Id})
    .then((result)=> {
      if(!req.session.cart)
      {
        req.session.cart = [];
      }
      res.render('sproduct1', {result: result,cart : req.session.cart })
    })
    .catch((err) =>{
      console.log(err);
    })
})
app.get('/sproduct2', (req,res) => {
  Product.findOne({Id:req.query.Id})
    .then((result)=> {
      if(!req.session.cart)
      {
        req.session.cart = [];
      }
      res.render('sproduct2', {result: result,cart : req.session.cart })
    })
    .catch((err) =>{
      console.log(err);
    })
})
app.get('/sproduct3', (req,res) => {
  Product.findOne({Id:req.query.Id})
    .then((result)=> {
      if(!req.session.cart)
      {
        req.session.cart = [];
      }
      res.render('sproduct3', {result: result,cart : req.session.cart })
    })
    .catch((err) =>{
      console.log(err);
    })
})
app.get('/sproduct4', (req,res) => {
  Product.findOne({Id:req.query.Id})
    .then((result)=> {
      if(!req.session.cart)
      {
        req.session.cart = [];
      }
      res.render('sproduct4', {result: result,cart : req.session.cart })
    })
    .catch((err) =>{
      console.log(err);
    })
})
app.get('/sproduct5', (req,res) => {
  Product.findOne({Id:req.query.Id})
    .then((result)=> {
      if(!req.session.cart)
      {
        req.session.cart = [];
      }
      res.render('sproduct5', {result: result,cart : req.session.cart })
    })
    .catch((err) =>{
      console.log(err);
    })
})
app.get('/sproduct6', (req,res) => {
  Product.findOne({Id:req.query.Id})
    .then((result)=> {
      if(!req.session.cart)
      {
        req.session.cart = [];
      }
      res.render('sproduct6', {result: result,cart : req.session.cart })
    })
    .catch((err) =>{
      console.log(err);
    })
})
app.get('/sproduct7', (req,res) => {
  Product.findOne({Id:req.query.Id})
    .then((result)=> {
      if(!req.session.cart)
      {
        req.session.cart = [];
      }
      res.render('sproduct7', {result: result,cart : req.session.cart })
    })
    .catch((err) =>{
      console.log(err);
    })
})
app.get('/sproduct8', (req,res) => {
  Product.findOne({Id:req.query.Id})
    .then((result)=> {
      if(!req.session.cart)
      {
        req.session.cart = [];
      }
      res.render('sproduct8', {result: result,cart : req.session.cart })
    })
    .catch((err) =>{
      console.log(err);
    })
})

app.get('/getinvolved', (req, res) => {
  res.render('getinvolved');
});

//Add to Cart
app.get('/projects', (req,res) => {
  Product.find()
    .then((result)=> {
      if(!req.session.cart)
      {
        req.session.cart = [];
      }
      res.render('projects', {products : result,cart : req.session.cart })
    })
    .catch((err) =>{
      console.log(err);
    })
})
app.post('/add_cart', (req, res) => {
  const { Id, Name, Price, NumberOf } = req.body;

  let itemFound = false;
  let limitExceeded = false;

  for (let i = 0; i < req.session.cart.length; i++) {
      if (req.session.cart[i].Id === Id) {
          if (req.session.cart[i].quantity + 1 > NumberOf) {
              // If adding one more of the item would exceed the quantity limit, set a flag
              limitExceeded = true;
              break;
          } else {
              // Increment the quantity if the item is found and the limit is not exceeded
              req.session.cart[i].quantity++;
              itemFound = true;
              break;
          }
      }
  }

  if (!itemFound && !limitExceeded) {
      // If the item is not found in the cart and the limit is not exceeded, add it
      req.session.cart.push({
          Id,
          Name,
          Price: parseFloat(Price),
          quantity: 1
      });
  }

  res.redirect(`/projects#scrolltarget`);
});

app.post('/add_cartp', (req, res) => {
  const count=req.body.item_count;
  const Id=req.body.Id;
  const Name=req.body.Name;
  const Price=req.body.Price;
  const Link=req.body.Link;

  for (let i = 0; i < req.session.cart.length; i++) {
      if (req.session.cart[i].Id === Id) {
        req.session.cart.splice(i, 1);
      }
  }
      req.session.cart.push({
          Id,
          Name,
          Price: parseFloat(Price),
          quantity: parseFloat(count)
      });
  res.redirect(`${Link}/?Id=${Id}`);
});

app.get('/remove_item', (req, res) => {
  const product_id = req.query.Id;
  const product_name = req.query.Name;
	const product_price = req.query.Price;
  console.log('Session cart before removal:', req.session.cart);
  console.log('ID:',product_id)
  let flag=0;
  for(let i = 0; i < req.session.cart.length; i++)
	{
		if(req.session.cart[i].Id === product_id)
		{
      if(req.session.cart[i].quantity === 1){
        req.session.cart.splice(i, 1);
      }
      else{
        let new_quantity = req.session.cart[i].quantity - 1;
        cart_data = {
          Id : product_id,
          Name : product_name,
          Price : parseFloat(product_price),
          quantity : new_quantity
        };
        req.session.cart.splice(i, 1);
        flag=1;
      }
		}
	}
  if(flag === 1)
  req.session.cart.push(cart_data);
console.log('Session cart after removal:', req.session.cart);
  res.redirect(`/projects#scrolltarget`);
});

app.get('/remove_itemp', (req, res) => {
  const product_id = req.query.Id;
  const product_name = req.query.Name;
	const product_price = req.query.Price;
  const product_link = req.query.Link;
  const product_linkId= req.query.LinkId;
  console.log('Session cart before removal:', req.session.cart);
  console.log('ID:',product_id)
  let flag=0;
  for(let i = 0; i < req.session.cart.length; i++)
	{
		if(req.session.cart[i].Id === product_id)
		{
      if(req.session.cart[i].quantity === 1){
        req.session.cart.splice(i, 1);
      }
      else{
        let new_quantity = req.session.cart[i].quantity - 1;
        cart_data = {
          Id : product_id,
          Name : product_name,
          Price : parseFloat(product_price),
          quantity : new_quantity
        };
        req.session.cart.splice(i, 1);
        flag=1;
      }
		}
	}
  if(flag === 1)
  req.session.cart.push(cart_data);
console.log('Session cart after removal:', req.session.cart);
  res.redirect(`${product_link}/?Id=${product_linkId}`);
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
