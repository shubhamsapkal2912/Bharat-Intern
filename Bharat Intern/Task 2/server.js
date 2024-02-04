const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model('Post', postSchema);

app.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    res.render('index', { posts: posts });
  });
});

app.get('/create', (req, res) => {
  res.render('create');
});

app.post('/create', (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content
  });

  newPost.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

app.get('/post/:postId', (req, res) => {
  const postId = req.params.postId;

  Post.findById(postId, (err, post) => {
    if (err) {
      console.log(err);
    } else {
      res.render('post', { post: post });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
