const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

exports.createMessage = async (req, res, next) => {
  try {
    const { recipient, text, media } = req.body;

    if (!recipient || !text.trim()) {
      return;
    }

    const newConversation = await Conversation.findOneAndUpdate(
      {
        $or: [
          { recipients: [req.user._id, recipient] },
          { recipients: [recipient, req.user._id] },
        ],
      },
      { recipients: [req.user._id, recipient], text, media },
      { new: true, upsert: true }
    );

    const newMessage = await Message.create({
      conversation: newConversation._id,
      sender: req.user._id,
      recipient: recipient,
      text,
      media,
    });

    res.json({ msg: "Created successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getConversations = async (req, res, next) => {
  try {
    const features = new APIfeatures(
      Conversation.find({ recipients: req.user._id }),
      req.query
    ).paginating();

    const conversations = await features.query
      .sort("-updatedAt")
      .populate("recipients", "avatar username fullname");

    res.json({ conversations, result: conversations.length });
  } catch (err) {
    next(err);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const features = new APIfeatures(
      Message.find({
        $or: [
          { sender: req.user._id, recipient: req.params.id },
          { sender: req.params.id, recipient: req.user._id },
        ],
      }),
      req.query
    ).paginating();

    const messages = await features.query.populate(
      "recipients",
      "avatar username fullname"
    );

    res.json({ messages, result: messages.length });
  } catch (err) {
    next(err);
  }
};

exports.deleteMessage = async (req, res, next) => {
  try {
    await Message.findOneAndDelete({
      _id: req.params.id,
      sender: req.user._id,
    });

    res.json({ msg: "message deleted" });
  } catch (err) {
    next(err);
  }
};

exports.deleteConversation = async (req, res, next) => {
  try {
    const newConversation = await Conversation.findOneAndDelete({
      $or: [
        { recipients: [req.user._id, req.params.id] },
        { recipients: [req.params.id, req.user._id] },
      ],
    });

    await Message.deleteMany({ conversation: newConversation._id });

    res.json({ msg: 'Delete success' });
    
  } catch (err) {
    next(err);
  }
};
