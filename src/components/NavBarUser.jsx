import React from 'react';
import BackButton from './BackButton';
import StyledAvatar from './StyledAvatar';

function NavBarUser({backbtn = true }) {
  return (
    <div 
      className="navbar-user" 
      style={{
        display: "flex", 
        flexDirection: "row",

      }}
    >
        { backbtn && <BackButton /> }
        <StyledAvatar/>
    </div>
  );
}

export default NavBarUser;