const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { userRoutes } = require('./routes/users');
const cors = require('cors');
const { projectRoutes } = require('./routes/projects');
const { fileRoutes } = require('./routes/files');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '30mb', extended: 'true' }));
app.use(cors({
  origin: '*'
}));

app.use('/users', userRoutes);
app.use('/users/:userId/projects', projectRoutes);
app.use('/users/:userId/projects/:projectId', fileRoutes);



//database
const dbURI = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`server running at port : ${PORT}`)))
  .catch((err) => console.log(err));

mongoose.set('useFindAndModify', false);