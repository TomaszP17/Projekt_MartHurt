import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-black bg-opacity-50 m-0 p-0">
      <Image
        src="/images/italux.jpg"
        alt="Hero Background"
        layout='fill'
        objectFit='cover'
        objectPosition='center'
        quality={100}
        style={{zIndex: -1}}
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
      />
      <div className="text-center">
        <h1 className="text-3xl md:text-7xl font-bold text-white">POZNAJ NAS</h1>
        <button className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
          poznaj nas
        </button>
      </div>
    </section>
  );
};

export default Hero;
