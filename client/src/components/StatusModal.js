import { useState, useEffect, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Resizer from "react-image-file-resizer";
import { CameraIcon, PaperClip, PhotographIcon } from "../icon";
import { actionTypes } from "../store/actions/actionTypes";
import { createPost, updatePost } from '../store/actions/postActions';
import IconsEmoji from "./IconsEmoji";

const StatusModal = () => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const [tracks, setTracks] = useState("");

  const hiddenInputRef = useRef(null);
  const hiddenAttachmentRef = useRef(null);
  const handleFocus = useRef(null);
  const videoRef = useRef(null);
  const CanvasRef = useRef(null);

  const { auth, status, socket } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  useEffect(() => {
    handleFocus.current.focus();
  }, []);

  useEffect(() => {
    if (status.onEdit) {
      setContent(status.content)
      setImages(status.images)
    }
  }, [status.onEdit, status.content, status.images]);

  const handleImageUpload = () => {
    hiddenInputRef.current.click();
  };

  const handleFileAttachment = () => {
    hiddenAttachmentRef.current.click();
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

  const deleteImage = (i) => {
    const newArr = [...images];

    newArr.splice(i, 1);

    setImages(newArr);
  };

  const handleStream = () => {
    setStream(true);

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;

          videoRef.current.play();
          const track = mediaStream.getTracks();
          setTracks(track[0]);
        })
        .catch((err) => console.log(err));
    }
  };

  

  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    CanvasRef.current.setAttribute("width", width);
    CanvasRef.current.setAttribute("height", height);

    const ctx = CanvasRef.current.getContext('2d');

    ctx.drawImage(videoRef.current, 0, 0, width, height);

    let URL = CanvasRef.current.toDataURL();

    setImages([...images, { camera: URL }]);
  }

  const handleStopStream = () => {
    tracks.stop();
    setStream(false);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (images.length === 0) {
      dispatch({ type: actionTypes.NOTIFY, payload: { error: "You have not added any images" } })
      return;
    };

    if (status.onEdit) {
      dispatch(updatePost({ content, images, auth, status }));
    } else {
      dispatch(createPost({ content, images, auth, socket }));
    }

    dispatch({ type: actionTypes.STATUS, payload: false });

    if (tracks) {
      tracks.stop();
    }
    setContent('');
    setImages([])
  
  }

  return (
    <div
      onClick={() => dispatch({ type: actionTypes.STATUS, payload: false })}
      className="fixed inset-0 z-50  bg-black bg-opacity-70 flex justify-center items-start overflow-y-auto sm:pb-4"
    >
      <form onSubmit={handleSubmit}
        onClick={(evt) => evt.stopPropagation()}
        className="mt-10 w-3/4 sm:w-1/2  bg-white flex flex-col overflow-y-auto"
      >
        <div className="text-center py-2 font-medium flex items-center px-4">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={auth.user.avatar}
            alt="avatar"
          />
          <span className="-ml-10 flex-1">Create post</span>
        </div>
        <div className="relative">
        <IconsEmoji content={content} setContent={setContent} />
          <textarea
            ref={handleFocus}
            className="block w-full focus:outline-none border-t border-gray-100 bg-white pl-2 pr-10 py-1"
            name=""
            cols="30"
            rows="3"
            value={content}
            onChange={(evt) => setContent(evt.target.value)}
            placeholder={`What's up, ${auth.user.username} ?`}
          ></textarea>

          <div className="w-full py-2 px-4 grid grid-flow-row grid-cols-6 place-content-center">
            {images.map((image, i) => (
              <div key={i} className="relative w-full h-full">
                <img
                  className="w-full h-full object-cover"
                  src={image.camera ? image.camera : image.url ? image.url : image}
                  alt="posts"
                />
                <span
                  onClick={() => deleteImage(i)}
                  className="-mt-2 absolute text-red-700 font-bold text-lg right-0 top-0 cursor-pointer"
                >
                  &times;
                </span>
              </div>
            ))}
          </div>
          {stream && (
            <div className="relative">
              <video
                className="w-full h-1/2"
                autoPlay
                muted
                ref={videoRef}
                width="100%"
                height="50%"
              />
              <span onClick={handleStopStream} className="absolute top-0 right-1 text-red-800 text-3xl font-bold cursor-pointer" >&times;</span>
              <canvas className="hidden" ref={CanvasRef} />
            </div>
          )}
        </div>
        <div className="flex border-t border-gray-100 py-2">
          {stream ? (
            <div className="flex justify-center w-full"><CameraIcon handleStream={handleCapture} /></div>
          ) : (
            <Fragment>
                <CameraIcon handleStream={handleStream} />
                
                <div className="ml-5 flex">
                  
                <PhotographIcon handleImageUpload={handleImageUpload} />
                <input
                  ref={hiddenInputRef}
                  type="file"
                  name="file"
                  multiple
                  accept="image/*, video/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <PaperClip handleFileAttachment={handleFileAttachment} />
                <input
                  ref={hiddenAttachmentRef}
                  type="file"
                  name="file"
                  multiple
                  style={{ display: "none" }}
                />
              </div>
            </Fragment>
          )}
        </div>
        <button type="submit" className="bg-bluegray-200 text-bluegray-800 font-semibold py-2 hover:bg-bluegray-300 hover:text-white focus:outline-none">
          Post
        </button>
      </form>
      <button
        onClick={() => dispatch({ type: actionTypes.STATUS, payload: false })}
        className="text-3xl font-bold text-red-700 focus:outline-none"
      >
        &times;
      </button>
    </div>
  );
};

export default StatusModal;
