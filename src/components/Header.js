import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Button from '@mui/material/Button';

import AuthContext from '../context/AuthContext';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Header extends React.Component {
  state = {
    anchorEl: null,
  };
  static contextType = AuthContext;

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    
    return (
        <div className={classes.root}>
          <AppBar position="static" style={{ background: '#2E3B55' }}>
            <Toolbar>
              <Typography variant="h6" className={classes.grow}>
                <Link to="/">
                  <img src="static/img/tayara-logo.svg" alt="fireSpot" style={{ display: "flex" }}/>
                </Link>
                <MenuItem>
                  <Typography textAlign="center">Annonces</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center">Historique des tasks</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center">Actions</Typography>
                </MenuItem>
              </Typography>
              
                {
                  this.context.user !== null ? (
                    <div>
                      <IconButton
                        aria-owns={open ? 'menu-appbar' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                        onClick={(e) => (this.handleMenu(e)) }
                      >
                        <PermIdentityIcon />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={open}
                        onClose={this.handleClose}
                      >
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>My account</MenuItem>
                        <MenuItem onClick={() => this.context.logoutUser()}>Logout</MenuItem>
                      </Menu>
                    </div>
                  ) : 
                  <>
                    <Button component={Link} to={'/login'} color="inherit" >Sign In</Button>
                    <Button variant="outlined" color="inherit" component={Link} to={'/'} >Sign Up</Button>
                  </>
              }
            </Toolbar>
          </AppBar>
        </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);