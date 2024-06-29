import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import image1 from "../assest/fun1.jpg";
import image2 from "../assest/fun3.jpeg";
import image3 from "../assest/fun4.jpeg";
import image4 from "../assest/fun5.jpeg";

// import image1Mobile from "../assest/banner/img1_mobile.jpg";
// import image2Mobile from "../assest/banner/img2_mobile.webp";
// import image3Mobile from "../assest/banner/img3_mobile.jpg";
// import image4Mobile from "../assest/banner/img4_mobile.jpg";

import { useEffect, useState } from "react";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [image1, image2, image3, image4];
  // const mobileImages = [image1Mobile, image2Mobile, image3Mobile, image4Mobile];
  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const prevImage = () => {
    if (currentImage != 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentImage]);
  return (
    <div className="container mx-auto px-4 rounded ">
      <div className="h-56 md:h-80 w-full bg-slate-200 relative">
        <div className="absolute z-10 w-full h-full md:flex items-center hidden">
          <div className=" flex justify-between w-full text-3xl">
            <button
              className="bg-white shadow-md  rounded-full p-1"
              onClick={prevImage}
            >
              <FaAngleLeft />
            </button>
            <button
              className="bg-white shadow-md rounded-full p-1"
              onClick={nextImage}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* desktop and tablet version */}

        <div className="hidden md:flex h-full w-full overflow-hidden">
          {desktopImages.map((imageURL, index) => {
            return (
              <div
                className="w-full h-full  min-w-full min-h-full transition-all"
                key={imageURL}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageURL} alt="" className="w-full h-full" />
              </div>
            );
          })}
        </div>

        {/* mobile versions */}
        <div className="flex h-full w-full overflow-hidden md:hidden">
          {desktopImages.map((imageURL, index) => {
            return (
              <div
                className="w-full h-full  min-w-full min-h-full transition-all"
                key={imageURL}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img
                  src={imageURL}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
