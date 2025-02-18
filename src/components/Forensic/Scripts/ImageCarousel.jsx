import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  "/images/image0.png",
  "/images/image1.png",
  "/images/image2.png",
  "/images/image3.png",
  "/images/image4.png",
  "/images/image5.png",
];

const ImageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    centerMode: true,
    focusOnSelect: true,
    customPaging: (i) => (
      <div className="custom-dot"></div> 
    ),
    dotsClass: "slick-dots custom-dots", 
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
        },
      },
    ],
  };

  return (
    <div className="relative z-10">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="px-2">
            <img
              src={image}
              alt={`Forensic Van ${index + 1}`}
              className="w-full h-64 object-cover mx-auto rounded-lg shadow-lg transition-transform duration-300 ease-in-out active-card"
            />
          </div>
        ))}
      </Slider>

      {/* Custom CSS Styles */}
      <style jsx>{`
        .custom-dots {
          bottom: -30px; /* Adjust position */
        }
        .custom-dot {
          width: 25px;
          height: 3px;
          background-color: gray;
          border-radius: 5px;
          margin: 0 5px;
          transition: background-color 0.3s ease-in-out;
        }
        .slick-dots li.slick-active .custom-dot {
          background-color: blue; /* Active dot color */
        }
      `}</style>
    </div>
  );
};

export default ImageCarousel;
