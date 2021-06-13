
const router = require("express").Router();
const postController = require("../controllers/postController");
const { auth } = require("../middlewares/auth");

router.post("/posts", auth, postController.createPost);

router.get("/post/:id", auth, postController.getPost);

router.get("/posts", auth, postController.getPosts);

router.get("/posts_discover", auth, postController.getPostDiscover);

router.patch("/posts/:id", auth, postController.updatePost);

router.patch("/posts/:id/like", auth, postController.likePost);

router.patch("/posts/:id/unlike", auth, postController.unLikePost);

router.get('/user_posts/:id', auth, postController.getUserPosts);

router.delete("/posts/:id", auth, postController.deletePost);

router.patch("/post_saved/:id", auth, postController.savePost);

router.patch("/post_unsaved/:id", auth, postController.unsavePost);

router.get("/getBookmarks", auth, postController.getBookmark);




module.exports = router;