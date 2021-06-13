
const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const notifyController = require("../controllers/notifyController");

router.post('/notify', auth, notifyController.createNotify);

router.delete('/notify/:id', auth, notifyController.deleteNotify);

router.get('/notifications', auth, notifyController.getNotifications);

router.patch('/notificationsRead/:id', auth, notifyController.notificationsRead);

router.delete('/deleteAll', auth, notifyController.deleteAllNotifications);




module.exports = router