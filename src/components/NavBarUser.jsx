import React from 'react';
import BackButton from './BackButton';
import StyledAvatar from './StyledAvatar';

function NavBarUser({backbtn = true, screenPath}) {
  return (
    <div 
      className="navbar-user" 
      style={{
        display: "flex", 
        flexDirection: "row",

      }}
    >
        { backbtn && <BackButton screenPath={screenPath}/> }
        <StyledAvatar/>
    </div>
  );
}

export default NavBarUser;