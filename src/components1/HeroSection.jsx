import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const images = [
    'public/slideShow/Gemini_Generated_Image_n34hg2n34hg2n34h.jpg',
    'public/slideShow/Gemini_Generated_Image_mzekimmzekimmzek.jpg',
    'public/slideShow/Gemini_Generated_Image_4ol6he4ol6he4ol6 (1).jpg',
    'public/slideShow/Gemini_Generated_Image_wizmicwizmicwizm.jpg',
    'public/slideShow/WhatsApp Image 2025-01-09 at 19.54.10_9e083ef7.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[500px] md:h-[500px] p-4 md:p-10 overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default HeroSection;
