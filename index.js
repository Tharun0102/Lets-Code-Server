const express = require('express');
const mongoose = require('mongoose');
const { userRoutes } = require('./routes/users');
const cors = require('cors');
const { projectRoutes } = require('./routes/projects');
const { fileRoutes } = require('./routes/files');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
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
  .catch((err) => console.error(err));

mongoose.set('useFindAndModify', false);