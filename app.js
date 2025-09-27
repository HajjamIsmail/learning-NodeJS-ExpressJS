const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// calls routers
const stuffRoutes = require('./routes/stuff');

mongoose.connect('mongodb+srv://ismo01:1234@cluster0.rvscyqr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('cnx mongoDB succed !'))
  .catch(() => console.log('cnx mongoDB failed !'));


const app = express();

// adding general middleware for apply all api
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/api/stuff', stuffRoutes);

module.exports = app;



// middleware used for request get
// app.get('/api/stuff', (req, res, next) => {
//   const stuff = [
//     {
//       _id: 'oeihfzeoi',
//       title: 'My First Object',
//       description: 'info for my first object',
//       imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//       price: 4900,
//       userId: 'qsomihvqios',
//     },
//     {
//       _id: 'oeihfzeomoihi',
//       title: 'My second object',
//       description: 'info for my second object',
//       imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//       price: 2900,
//       userId: 'qsomihvqios',
//     },
//   ];
//   res.status(200).json(stuff);
// });







//here this example basic for middleware :

// const express = require('express');

// // create app express
// const app = express();

// // middleware => receive response in server
// app.use((req, res, next) => {
//     console.log('request receive');
//     next();
// });

// // middlewate change code status
// app.use((req, res, next) => {
//     res.status(201);
//     next();
// })

// // middleware => receive response format json => client
// app.use((req, res, next) => {
//     res.json({ message: 'request receive successufully'});
//     next();
// });

// // last middleware => we don't need to put next because he is the last middleware
// app.use((req, resp) => {
//     console.log("response send success");
// })

// //export app express
// module.exports = app;