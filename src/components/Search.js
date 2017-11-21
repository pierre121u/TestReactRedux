import React, { Component } from 'react';
import { Dropdown, Button, NavItem } from 'react-materialize';
import { fetchStarwars, fetchSchema } from '../actions/starwars';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Search extends Component {
  handleSelect = (eventKey) => {
    this.props.items.schema = null;
    this.props.fetchStarwars(eventKey);
    this.props.fetchSchema(eventKey);
  }

  handleClick(section){
    this.props.items.schema = null;
    this.props.fetchStarwars(section);
    this.props.fetchSchema(section);
  }

  render() {
    return(
      <Dropdown trigger={
        <Button>{this.props.items.section || 'loading'}</Button>
      } >

        <NavItem href="#" onClick={() => this.handleClick("films")}>Films</NavItem>
        <NavItem href="#" onClick={() => this.handleClick("people")}>People</NavItem>
        <NavItem href="#" onClick={() => this.handleClick("planets")}>Planets</NavItem>
        <NavItem href="#" onClick={() => this.handleClick("species")}>Species</NavItem>
        <NavItem href="#" onClick={() => this.handleClick("starships")}>Starships</NavItem>
        <NavItem href="#" onClick={() => this.handleClick("vehicles")}>Vehicles</NavItem>

      </Dropdown>
    )
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
  };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({fetchStarwars: fetchStarwars, fetchSchema: fetchSchema}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Search);
