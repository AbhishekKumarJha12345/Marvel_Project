import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import images
import Picture1 from "../../assets/Picture1.jpg";
import Picture2 from "../../assets/Picture2.jpg";
import Picture3 from "../../assets/Picture3.jpg";
import Picture4 from "../../assets/Picture4.jpg";
import Picture5 from "../../assets/Picture5.jpg";
import Picture6 from "../../assets/Picture6.jpg";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-full h-auto">
      <h2 className="text-2xl font-bold mb-6" >Image Carousel</h2>
      <Slider {...settings}>
        {[Picture1, Picture2, Picture3, Picture4, Picture5, Picture6].map(
          (image, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
          )
        )}
      </Slider>
    </div>
  );
};

export default Carousel;
