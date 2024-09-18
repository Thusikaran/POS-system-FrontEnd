import React from 'react';

const NotFound = () => {
  return (
    <div className='container mt-4' style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',height:'80vh'}}>
      <h2>404 - Page Not Found</h2>
      <p>The page you're looking for does not exist.</p>
    </div>
  );
};

export default NotFound;