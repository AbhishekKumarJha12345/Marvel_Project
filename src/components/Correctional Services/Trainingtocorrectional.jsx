import React, { useState, useEffect } from 'react';
import Picture1 from '../../assets/Training1.png';
import Picture2 from '../../assets/Training2.png';

const Training = () => {
  const [activeSlide, setActiveSlide] = useState(1);

  const images = [Picture1, Picture2];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveSlide((prev) => (prev === images.length ? 1 : prev + 1));
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  const handlePrevClick = () => {
    setActiveSlide((prev) => (prev === 1 ? images.length : prev - 1));
  };

  const handleNextClick = () => {
    setActiveSlide((prev) => (prev === images.length ? 1 : prev + 1));
  };

  return (
    <div>
        <h1 className='font-bold text-xl text-center mt-5 mb-5'>Training to Correctional Services Personnel</h1>
        <div className="relative container mx-auto bg-gray-500" style={{ maxWidth: '1600px' }}>
      <div className="relative overflow-hidden w-full">
        <div
          className="relative flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${(activeSlide - 1) * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="carousel-item w-full flex-shrink-0"
              style={{
                height: '80vh', 
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
            </div>
          ))}
        </div>

        <button
          onClick={handlePrevClick}
          className="prev w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer text-3xl font-bold text-black hover:text-white rounded-full bg-opacity-20 bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 left-0 my-auto"
        >
          ‹
        </button>

        <button
          onClick={handleNextClick}
          className="next w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer text-3xl font-bold text-black hover:text-white rounded-full bg-opacity-20 bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 right-0 my-auto"
        >
          ›
        </button>

        <ol className="carousel-indicators absolute bottom-2 left-0 right-0 text-center z-10">
          {images.map((_, index) => (
            <li key={index} className="inline-block mr-3">
              <button
                onClick={() => setActiveSlide(index + 1)}
                className={`carousel-bullet cursor-pointer block text-5xl text-gray-400 hover:text-gray-900 ${
                  activeSlide === index + 1 ? 'text-green' : ''
                }`}
              >
                -
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
    <p className='font-bold text-xl text-center mt-3 text-red-500'>Training Conducted at Jail Officers Training Centre, Pune</p>

    </div>
    
  );
};

export default Training;
