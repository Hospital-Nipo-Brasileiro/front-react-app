import React from 'react';

function BackgroundTN({ title, children, customStyledApp, Height }) {
  return (
    <div className={`bg-[#0a1444] w-full md:h-screen ${Height === undefined ? "h-full" : Height}  flex justify-center`}>
      <span
        className='
          absolute font-bayon text-white text-shadow
          2xl:top-4 2xl:text-8xl 
          xl:top-4 xl:text-7xl 
          lg:text-6xl lg:top-10 
          md:text-5xl md:top-12 
          text-4xl top-12 
        '
      >
        {title}
      </span>
      <div className={`mt-[65px] w-11/12 h-5/6 rounded-3xl bg-gradient-to-br from-green-500 to-blue-300 shadow-2xl shadow-black sm:px-0 mb-[65px] ${customStyledApp}`}>
        {children}
      </div>
    </div >
  );
}

export default BackgroundTN;