import React from 'react';

const BackgroundWrapper = ({ children }:any) => {
  return (
    <div className="background-wrapper">
      {children}
      <img className='absolute bottom-0 w-screen' src='bg-gradiant.svg'/>
    </div>
  );
};

export default BackgroundWrapper;