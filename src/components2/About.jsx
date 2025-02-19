import React from 'react';

const About = () => {
  return (
    <div className=" bg-gray-100 flex flex-col items-center py-10 mt-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-yellow-500 mb-6">About Golden Phoenix</h1>
        
        <p className="text-lg text-gray-700 mb-6">
          Welcome to Golden Phoenix Shoe Store, your ultimate destination for high-quality footwear.
          Founded with a passion for style and comfort, we offer a wide variety of shoes for men, women.
        </p>

        <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 mb-6">
          At Golden Phoenix, our mission is to provide our customers with the most comfortable, stylish, and durable shoes at an affordable price.
          We are dedicated to offering a diverse selection of shoes that cater to all tastes, preferences, and occasions.
        </p>

        <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Our Story</h2>
        <p className="text-lg text-gray-700 mb-6">
          Our journey began with a small store in the heart of the city, where we aimed to bring the finest quality footwear to shoe enthusiasts.
          Over the years, we've expanded to offer an online store with a global reach, bringing the latest trends and best deals directly to you.
        </p>

        <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Why Choose Us?</h2>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
          <li>Wide selection of shoes for men, women.</li>
          <li>Affordable prices without compromising on quality</li>
          <li>Exceptional customer service and fast shipping</li>
        </ul>

        <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Join the Golden Phoenix Family</h2>
        <p className="text-lg text-gray-700">
          We invite you to explore our collection of premium shoes and join the Golden Phoenix family today. 
          Experience comfort, style, and quality like never before!
        </p>
      </div>
    </div>
  );
};

export default About;
