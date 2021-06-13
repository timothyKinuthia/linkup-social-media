
const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const messageController = require("../controllers/messageController");

router.post('/message', auth, messageController.createMessage);
router.get('/conversation', auth, messageController.getConversations);
router.get('/message/:id', auth, messageController.getMessages);
router.delete('/deleteMessage/:id', auth, messageController.deleteMessage);
router.delete('/conversation/:id', auth, messageController.deleteConversation);

module.exports = router;