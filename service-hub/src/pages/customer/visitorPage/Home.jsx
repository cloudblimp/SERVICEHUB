import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">My Website</div>
        <ul className="flex space-x-4">
          <li><a href="#home" className="text-white hover:text-gray-300">Home</a></li>
          <li><a href="#about" className="text-white hover:text-gray-300">About</a></li>
          <li><a href="#services" className="text-white hover:text-gray-300">Services</a></li>
          <li><a href="#contact" className="text-white hover:text-gray-300">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

const HomePage = () => {
  return (
    <div>
      <Navbar />

      <div className="w-screen h-screen overflow-hidden relative before:block before:absolute before:bg-black before:h-full before:w-full before:top-0 before:left-0 before:z-10 before:opacity-30">
        <img src="https://picsum.photos/seed/picsum/1900/850" className="absolute top-0 left-0 min-h-full" alt="background" />
        <div className="relative z-20 max-w-screen-lg mx-auto grid grid-cols-12 h-full items-center">
          <div className="col-span-6">
            <span className="uppercase text-white text-xs font-bold mb-2 block">WE ARE EXPERTS</span>
            <h1 className="text-white font-extrabold text-5xl mb-8">Finpoint provides Financial Consulting in different ways</h1>
            <p className="text-stone-100 text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button className="mt-8 text-white uppercase py-4 text-base font-light px-10 border border-white hover:bg-white hover:bg-opacity-10">Get started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
