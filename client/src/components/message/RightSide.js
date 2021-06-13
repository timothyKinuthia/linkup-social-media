import { useState, useEffect, useRef, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Resizer from "react-image-file-resizer";
import { actionTypes } from "../../store/actions/actionTypes";
import { addMessage, getMessages, deleteMessage } from "../../store/actions/messageActions";
import Card from "../Card";
import Avatar from "../Avatar";
import MessageDisplay from "./MessageDisplay";
import { DeleteIcon, PhotographIcon, SendIcon } from "../../icon";
import IconsEmoji from "../IconsEmoji";
import { imageUploader } from "../../helpers/imageUpload";

const RightSide = () => {
  const [user, setUser] = useState("");
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [load, setLoad] = useState(false);

  const hiddenInputRef = useRef(null);
  const hiddenAttachmentRef = useRef(null);

  const { id } = useParams();
  

  const dispatch = useDispatch();

  const { auth, message, socket } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    const newUser = message.users.find((item) => item._id === id);

    if (newUser) {
      setUser(newUser);
    }
  }, [id, message.users]);

  const handleImageUpload = () => {
    hiddenInputRef.current.click();
  };

  const handleImageChange = (evt) => {
    const files = [...evt.target.files];

    files.forEach(async (file) => {
      if (file) {
        try {
          await Resizer.imageFileResizer(
            file,
            300,
            300,
            "JPEG",
            100,
            0,
            (uri) => {
              setImages([...images, uri]);
            },
            "base64",
            200,
            200
          );
        } catch (err) {
          dispatch({
            type: actionTypes.NOTIFY,
            payload: { error: "Image not uploaded. Please try another image." },
          });
        }
      }
    });
  };
  const handleDeleteMedia = (index) => {
    const newImages = [...images];

    newImages.splice(index, 1);

    setImages(newImages);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (!text.trim() || user === "") {
      return;
    }

    setLoad(true);

    let newArr = [];

    if (images.length > 0) {
      newArr = await imageUploader(images);
    }

    const msg = {
      sender: auth.user._id,
      recipient: id,
      text,
      media: newArr,
      createdAt: new Date().toISOString(),
    };

    await dispatch(addMessage({ msg, auth, socket }));

    setLoad(false);

    setText("");
    setImages([]);
  };

  useEffect(() => {
    const getMessagesData = async () => {
      if (message.data.every((item) => item._id !== id)) {
        await dispatch(getMessages({ auth, id }));
      }
    };

    getMessagesData();
  }, [message.data, id, dispatch, auth]);

  const handleDeleteMessage = (msg) => {

    dispatch(deleteMessage({ msg, data: message.data, auth }));
  }


  return (
    <div className="w-full h-full py-4 px-3 ">
      <div>
        {message.users.length > 0 && <Card user={user} callMenu={true} />}
      </div>
      <div className="px-4 sm:px-8 pb-2">
        <div className="space-y-4 mt-4">
          {message.data.length > 0 &&
            message.data.map((msg) => (
              <div key={msg._id}>
                <div className="flex justify-start">
                  {msg.sender !== auth.user._id && (
                    <div className="w-2/3">
                      <div className="flex items-center mb-1.5">
                        <Avatar
                          src={user.avatar}
                          alt="avatar"
                          width={6}
                          height={6}
                        />
                        <span className="ml-2 text-sm font-semibold">
                          {user.username}
                        </span>
                      </div>
                      <div className="inline-block bg-truegray-100 px-2 py-2 rounded-2xl rounded-br-none">
                        <MessageDisplay user={user} msg={msg} />
                      </div>
                
                    </div>
                  )}
                </div>
                {msg.sender !== auth.user._id &&
                  msg.media.length > 0 &&
                  msg.media.map((item) => (
                    <div key={item.public_id}>
                      <img className="w-1/4" src={item.url} alt="media" />
                    </div>
                  ))}
                {msg.sender === auth.user._id && (
                  <Fragment>
                    <div className="flex justify-end">
                      <div className="w-2/3 -mr-6">
                        <div className="flex flex-col items-end">
                          <span
                            
                            className="inline-block bg-lightblue-300 px-2 py-2 rounded-2xl rounded-br-none"
                          >
                            <MessageDisplay user={auth.user} msg={msg} />
                          </span>
                        </div>
                      </div>
                      <button onClick={() => handleDeleteMessage(msg)} className="opacity-0 hover:opacity-100 focus:outline-none">
                        <DeleteIcon
                          hw=" w-4 h-4 ml-8 text-truegray-600"
                        />
                      </button>
                    </div>
                    {msg.sender === auth.user._id &&
                      msg.media.length > 0 &&
                      msg.media.map((item) => (
                        <div key={item.public_id}>
                          <img className="w-1/4" src={item.url} alt="media" />
                        </div>
                      ))}
                  </Fragment>
                )}
              </div>
            ))}
          <div className="flex flex-wrap">
            {load ? (
              <h4 className="text-gray-600 text-sm font-semibold">Sending...</h4>
            ) : images.length > 0 ? (
              images.map((image, i) => (
                <div key={i} className="relative w-32">
                  <img
                    className="w-28 h-28"
                    src={image.url ? image.url : image}
                    alt="pic"
                  />
                  <span
                    onClick={() => handleDeleteMedia(i)}
                    className="absolute -mt-2 top-0 right-0 text-red-800 font-bold cursor-pointer"
                  >
                    &times;
                  </span>
                </div>
              ))
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="text-center">
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative flex items-center border border-b pt-1.5 pb-16 border-gray-100"
      >
        <input
          className="block w-full py-3 pl-4 pr-8 focus:outline-none"
          type="text"
          placeholder="Type your message..."
          value={text}
          onChange={(evt) => setText(evt.target.value)}
        />
        <span className="mr-8 text-truegray-400">
          <span className="absolute top-2.5 right-10 sm:right-24">
            <IconsEmoji content={text} setContent={setText} />
          </span>
        </span>
        <div className="flex justify-center sm:mr-4">
          <span className="">
            <PhotographIcon handleImageUpload={handleImageUpload} />
          </span>
          <input
            ref={hiddenInputRef}
            type="file"
            name="file"
            multiple
            accept="image/*, video/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <input
            ref={hiddenAttachmentRef}
            type="file"
            name="file"
            multiple
            style={{ display: "none" }}
          />
        </div>
        <button
          className="ml-1 hover:text-gray-700 focus:outline-none"
          type="submit"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default RightSide;
