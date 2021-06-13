import React from "react";
import "./loading.css";

const Loading = () => {
  return (
    <div className="fixed flex justify-center bg-red-700 bg-opacity-30 z-10 inset-0 h-screen w-full">
      <div className="lds-heart">
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
