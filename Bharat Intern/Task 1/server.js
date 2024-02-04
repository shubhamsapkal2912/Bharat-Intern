const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost/registrationDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/register', (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  newUser.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.send('Registration successful!');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
