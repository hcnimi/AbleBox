import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import logo from '../assets/logo-xs.png';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <header>
        {(this.props.location.pathname === '/home') ? //this is temporarily set to false. Will need to be modified to check for signed in state
          (<Navbar className="navbar bg-transparent" light>
            <NavbarBrand href="/home">
              <img src={logo} alt="Logo"/>
            </NavbarBrand>
            <Nav>
              <NavItem>
                <NavLink tag={Link} to='/home'>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to='/upload'>Upload</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to='/logout'>Sign Out</NavLink>
              </NavItem>
            </Nav>
          </Navbar>) :
          (<Navbar className="navbar bg-transparent" light>
            <NavbarBrand href="/home">
              <img src={logo} alt="Logo"/>
            </NavbarBrand>
            <Nav>
              { (this.props.location.pathname === '/signup') ?
                (<NavItem>
                  <NavLink tag={Link} to='/login'>Sign In</NavLink>
                </NavItem>) :
                (<NavItem>
                  <NavLink tag={Link} to='/signup'>Sign Up</NavLink>
                </NavItem>)
              }
            </Nav>
          </Navbar>)
        }
      </header>
    )
  }
}

export default withRouter(Header);
