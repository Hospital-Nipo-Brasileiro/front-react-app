import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function StyledAvatar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const SignOutButton = () => {
    const { signOut } = useAuth();

    const handleSignOut = () => {
      signOut();
      handleClose(); // Feche o menu após fazer logout, se desejado
    };

    return (
      <MenuItem onClick={handleSignOut}>
        <span>Logout</span>
      </MenuItem>
    );
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar sx={{ width: 40, height: 40 }} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 40,
              height: 40,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to={"/home"} style={{ textDecoration: "none", color: "#000" }}>
          <MenuItem onClick={handleClose}>
            <span>Setting</span>
          </MenuItem>
        </Link>
        <SignOutButton /> 
        <Link to={"/meu-usuario"} style={{ textDecoration: "none", color: "#000" }}>
          <MenuItem onClick={handleClose}>
            <Avatar /> My account
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
}

export default StyledAvatar;
