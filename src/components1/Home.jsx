import { useNavigate } from 'react-router-dom';
import HeroSection from './HeroSection';


const Home = () => {
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-white flex flex-col ">
      <HeroSection />

      <div className="flex-grow relative">

        <header className="absolute top-[-300px] left-0 w-full bg-black bg-opacity-50 text-center py-5">
          <h1 className="text-4xl font-bold text-white mb-6">Welcome to Our Store</h1>
          <p className="text-2xl text-amber-50">
            Explore the unique fashion of aesthetic colors shoes for men and women.
          </p>
        </header>

        <div className="container mx-auto px-4 sm:px-6 md:px-48 pb-10 ">
          <div
            onClick={() => navigate('/products')}
            className="bg-white shadow-md rounded-lg p-8 hover:scale-105 hover:shadow-xl cursor-pointer transition-all duration-600 w-full flex justify-between items-center"
          >

            <div className="w-1/2 pr-8">
              <h3 className="text-3xl font-bold text-gray-600 mb-4">Explore more</h3>
              <p className="text-lg text-gray-700 mb-4">
                Discover a wide range of shoes for both men and women. Choose your perfect pair.
              </p>
              <button className="px-6 py-2 bg-gradient-to-r from-yellow-500  to-yellow-700 hover:from-yellow-600  hover:to-yellow-800  text-white rounded transition duration-1000 ">
                All Products
              </button>
            </div>

            <div className="w-1/2">
              <img
                className="w-full h-full object-cover rounded-md"
                src="public\categories\new-collection-concept-3d-realistic-260nw-2384217369.jpg"
                alt="Men and Women's Products"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center py-10 pt-5">
          <div className="w-2/4 px-10 pl-5 mb-10">
            <img
              className="object-cover"
              src="public\shoeMaterial\WhatsApp Image 2025-02-10 at 18.13.52_742f5f61.jpg"
              alt="Selected materials"
            />
          </div>

          <div className="w-1/2 pl-8">
            <h2 className="text-orange-500 text-lg font-bold mb-2">OUR PRODUCT MADE OF</h2>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Selected materials designed for comfort and sustainable</h3>
            <div className="w-1/2">
              <ul className="list-disc list-inside text-gray-700 space-y-4">
                <li>
                  <span className="font-semibold">LEATHER:</span> Allows air circulation, keeping feet dry and odor-free, resistance to water and spills.
                </li>
                <li>
                  <span className="font-semibold">INSOLE:</span> Cushioning, Arch Support, Antimicrobial Properties, Memory Foam Technology, Shock Absorption.
                </li>
                <li>
                  <span className="font-semibold">OUTSOLE:</span> Lightweight, Traction, Durability, Flexibility, Lightweight Materials.
                </li>
                <li>
                  <span className="font-semibold">LACES:</span> Waxed cotton or nylon resist fraying and breaking.
                </li>
              </ul>
            </div>

            <br />
            <a
              href="/about"
              className="text-orange-500 font-semibold hover:underline inline-flex items-center"
            >
              Know About Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

