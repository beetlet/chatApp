import React from 'react';
import Typed from 'react-typed';

const TypedHeader = () => {
  return (
    <div style={{  lineHeight : 1, fontSize: 38}}>
      <Typed
        strings={['Go', 'Gin', 'React Native','Frontend Cloud','Vercel','Enjoy!']}
        typeSpeed={40}
        backSpeed={50}
        loop
      />
    </div>
  );
};

export default TypedHeader;