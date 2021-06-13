import { useState } from "react";

const CarouselPost = ({ images }) => {
  const [counter, setCounter] = useState(0);

  const handleNextImage = () => {
    const listLength = images.length - 1;

    if (counter < listLength) {
      setCounter((prev) => prev + 1);
    } else {
      setCounter((prev) => listLength - prev);
    }
  };
  const handlePrevImage = () => {
    const listLength = images.length - 1;
    if (counter > 0) {
      setCounter((prev) => prev - 1);
    } else {
      setCounter(listLength);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full h-full my-2 flex justify-center">
        <div className="relative w-full h-full overflow-hidden">
          <img
            className="w-full h-full object-cover object-center"
            src={images[counter].url}
            alt="profile"
          />
          {images.length > 1 && (
            <>
              <svg
                className="h-16 w-16 absolute top-1/2 right-0 text-white cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={() => handleNextImage()}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <svg
                className="h-16 w-16 absolute top-1/2 left-0 text-white cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={() => handlePrevImage()}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarouselPost;
