const express = require('express');
const app = express();
const authRoutes = require('../routes/authRoutes');
const trackRoutes = require('../routes/trackRoutes');
const requireAuth = require('../middlewares/requireAuth');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(authRoutes);
app.use(trackRoutes);

// MongoDB configuration
const mongoose = require('mongoose');
const mongoUri = 'mongodb+srv://root:root@cluster0.s1ldu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => console.log(`Connected to mongo instance`));
mongoose.connection.on('error', (err) => console.log(`Error: ${err}`));

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

const port = process.env.PORT || 3000;

app.listen(3000, () => console.log(`App running on port ${port}`));