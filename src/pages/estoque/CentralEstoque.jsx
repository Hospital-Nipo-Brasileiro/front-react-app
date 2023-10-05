import React from 'react';
import './StyleCentralEstoque.css'
import { Link } from 'react-router-dom';
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';


function CentralEstoque() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  return (
    <div className="login-background">
      <span className="title-technipo">ESTOQUE</span>
      <div className="app-background">
        <div className="navbar-user">
          <Link to={"/home"}>
            <div className="container-btn-comeback">
              <img src="" alt="" />
            </div>
          </Link>

          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 40, height: 40 }}>M</Avatar>
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
                  width: 32,
                  height: 32,
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
            <Link to={"/home"}>
                <MenuItem onClick={handleClose}>
                    <span>Setting</span>

                </MenuItem>
            </Link>
            <MenuItem onClick={handleClose}>
              <Avatar /> My account
            </MenuItem>
          </Menu>
        </div>

        <div className="container-content-estoques">
          <div className="container-cards-estoque">
            <div className="card-estoque"></div>
            <div className="card-estoque"></div>
            <div className="card-estoque"></div>
            <div className="card-estoque"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CentralEstoque;