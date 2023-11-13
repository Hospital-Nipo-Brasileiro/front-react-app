import React from 'react';
import BackButton from './BackButton';
import StyledAvatar from './StyledAvatar';

function NavBarUser({backbtn = true, screenPath}) {
  return (
    <div className='w-full h-12 rounded-3xl flex justify-between items-center bg-white'>
        { backbtn && <BackButton screenPath={screenPath}/> }
        <StyledAvatar/>
    </div>
  );
}

export default NavBarUser;