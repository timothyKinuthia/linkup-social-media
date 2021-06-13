
const MessageDisplay = ({ user, msg }) => {
  return (
    <div className="">
      <div className="mt-1 text-sm font-medium ">
        {msg.text && <>{msg.text}</>}
      </div>
      <div className="text-xs italic font-medium text-gray-700">
        {new Date(msg.createdAt).toLocaleString("en-us", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        </div>
    </div>
  );
};

export default MessageDisplay;
