import React from 'react';
import BackButton from './BackButton';
import StyledAvatar from './StyledAvatar';

function NavBarUser() {
  return (
    <div className="navbar-user">
        <BackButton />
        <StyledAvatar/>
    </div>
  );
}

export default NavBarUser;