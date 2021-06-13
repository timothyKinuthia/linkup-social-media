const Notify = require("../models/notify");

exports.createNotify = async (req, res, next) => {
  try {
    const { id, recipients, url, text, content, image } = req.body;

    const found = recipients.some((val) => val === req.user._id.toString());

    if (found) {
      return;
    }

    const notify = await Notify.create({
      id,
      recipients,
      url,
      text,
      content,
      image,
      user: req.user._id,
    });

    res.json({ notify });
  } catch (err) {
    next(err);
  }
};

exports.deleteNotify = async (req, res, next) => {
  try {
    const notify = await Notify.findOneAndDelete({
      id: req.params.id,
      url: req.query.url,
    });

    res.json({ notify });
  } catch (err) {
    next(err);
  }
};

exports.getNotifications = async (req, res, next) => {
    
  try {
        
    const notifications = await Notify.find({ recipients: req.user._id }).sort('-createdAt').populate('user', 'avatar username');

    res.json({ notifications });

  } catch (err) {
    next(err)
  }
};

exports.notificationsRead = async (req, res, next) => {
  
  try {
    const notifications = await Notify.findOneAndUpdate({ _id: req.params.id }, { isRead: true });

    res.json({ notifications });

  } catch (err) {
    next(err)
  }
};

exports.deleteAllNotifications = async (req, res, next) => {
  
  try {
    const notifications = await Notify.deleteMany({ recipients: req.user._id });

    res.json({ notifications });

   } catch (err) {
    next(err)
  }
}
