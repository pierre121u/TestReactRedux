import React, { Component } from 'react';
import { Navbar, NavItem } from 'react-materialize';

import Search from './Search';

export default class Header extends Component {
  render() {
    return(
      <Navbar className="teal" brand='Search Engine from Starwars API' right>
        <NavItem href="#">
          <Search />
        </NavItem>
      </Navbar>
    )
  }
}
