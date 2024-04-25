const express = require('express')

const router = express.Router()
const posts = require("../data/posts");  //brining in other endpoints
const { route } = require('./postRoutes');
const comments = []

router
  .route("/api/posts")
  .get((req, res) => {
    const userId = +req.query.userId
    if (userId) {
        const userPosts = posts.filter( (post) => {
            return post.userId === userId
        })
        res.json(userPosts)
    } else {
        res.json(posts)
    }
    res.json(posts);
  })
  .post((req, res) => {
    // Within the POST request route, we create a new
    // post with the data given by the client.
    if (req.body.userId && req.body.title && req.body.content) {
      const post = {
        id: posts[posts.length - 1].id + 1,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
      };

      posts.push(post);
      res.json(posts[posts.length - 1]);
    } else res.json({ error: "Insufficient Data" });
  });

router
  .route("/api/posts/:id")
  .get((req, res, next) => {
    const post = posts.find((p) => p.id == req.params.id);
    if (post) res.json(post);
    else next();
  })
  .patch((req, res, next) => {
    // Within the PATCH request route, we allow the client
    // to make changes to an existing post in the database.
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        for (const key in req.body) {
          posts[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  })
  .delete((req, res, next) => {
    // The DELETE request route simply removes a resource.
    const post = posts.find((p, i) => { //use find method to locate post
      if (p.id == req.params.id) { //using the params id
        posts.splice(i, 1);        //use slice method to delete
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  });


router
  .route('api/comments')
  .post((req, res) => {
    if (req.body.userId && req.body.postId && req.body.body) {
        const comment = {
          id: comments[comments.length - 1].id + 1,
          userId: req.body.userId,
          postId: req.body.postId,
          body: req.body.body,
        };

        comments.push(comment)
        res.json(comment[posts.length - 1])
  } else res.json({ error: "Insufficient Data" });
})


module.exports = router