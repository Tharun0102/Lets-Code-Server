const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { userRoutes } = require('./routes/users');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/users/', userRoutes);


//database
const dbURI = "mongodb+srv://tharun-1:hx8wIuJxNtIfwYP7@cluster0.jwwhv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`server running at port : ${PORT}`)))
  .catch((err) => console.log(err));

mongoose.set('useFindAndModify', false);