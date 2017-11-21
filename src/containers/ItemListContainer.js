import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchStarwars, fetchSchema } from '../actions/starwars';
import Item from '../components/Item';
import Filter from '../components/Filter';
import ItemList from '../components/ItemList';
import { Row, Col, ProgressBar, Button, Icon } from 'react-materialize';

class ItemListContainer extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      itemsToDisplay: [],
      filters: [],
      values: []
    }
  }

  filtrerLesItems(filter, value)
  {
    let itemsToKeep = [];
    this.props.items.item.results.forEach(function(item){
      for (var variable in item) {
        if (item.hasOwnProperty(variable)) {
          if (variable === filter) {
            if (!isNaN(item[variable])) {
              if (value <= Number(item[variable])) {
                itemsToKeep.push(item);
              }
            }
            else if (variable === 'species' || variable === 'starships' || variable === 'vehicles'
            || variable === 'planets' || variable === 'films' || variable === 'pilots'
            || variable === 'people' || variable === 'residents') {
              let i = 'Resume' + variable.charAt(0).toUpperCase() + variable.slice(1);

              for (var key in item[i]) {
                if (item[i].hasOwnProperty(key)) {
                  if (!itemsToKeep.includes(item)) {
                    if (item[i][key].name) {
                      if (item[i][key].name.toLowerCase().includes(value.toLowerCase())) {
                        itemsToKeep.push(item);
                      }
                    }else if (item[i][key].title) {
                      if (item[i][key].title.toLowerCase().includes(value.toLowerCase())) {
                        itemsToKeep.push(item);
                      }
                    }
                  }
                }
              }
            }
            else if(variable !== 'species' && variable !== 'starships' && variable !== 'vehicles' && variable !== 'planets'
            && variable !== 'films' && variable !== 'pilots' && variable !== 'people' && variable !== 'residents'
            && item[variable].toLowerCase().includes(value.toLowerCase()))
            {
              itemsToKeep.push(item);
            }
          }
        }
      }
    })
    this.state.itemsToDisplay = itemsToKeep;
  }

  handleChange = (e) =>
  {
    let filter = e.target.placeholder;
    let value = e.target.value;

    if(value !== '')
    {
      if (this.state.filters.indexOf(filter) !== -1) {
        this.state.values[this.state.filters.indexOf(filter)] = value;
      }else {
        this.state.filters.push(filter);
        this.state.values.push(value);
      }
    }
    else
    {
      this.state.filters.splice(this.state.filters.indexOf(filter), 1)
      this.state.values.splice(this.state.values.indexOf(value), 1)
    }
  }



  renderList() {
    // must wrap .map block with conditional statement
    if (this.props.items.item.results) {
      this.props.fetchSchema(this.props.items.section)

      if (this.state.filters.length > 0) {
        this.state.filters.map((filterToApply, id) => (
          this.filtrerLesItems(filterToApply, this.state.values[id])
        ))
      }else {
        this.state.itemsToDisplay = this.props.items.item.results;
      }

      let filtersAvailable = "";
      if (this.props.items.schema) {
        let filtersUtils = [];
        this.props.items.schema.required.forEach(function(filter){
          if(filter !== 'created' && filter !== 'edited' && filter !== 'url')
            filtersUtils.push(filter);
        });
        filtersAvailable = filtersUtils.map((filter, id) => (
          <Filter key={id} filter={filter} onchange={this.handleChange} />
        ));
      }else {
        filtersAvailable = <Col s={12}><b>Filters are loading...</b><ProgressBar /></Col>
      }

      const children = this.state.itemsToDisplay.map((item, i) => (
        <Item key={i} item={item} />
      ));

      let numPage = "";

      let prevPage = "";
      if(this.props.items.item.previous)
        prevPage = <Button waves='light' onClick={() => this.props.fetchStarwars(this.props.items.item.previous)}> Page précèdente <Icon left>chevron_left</Icon></Button>

      let nextPage = "";
      if(this.props.items.item.next)
      {
        nextPage = <Button waves='light' onClick={() => this.props.fetchStarwars(this.props.items.item.next)}> Page suivante <Icon right>chevron_right</Icon></Button>
        numPage = Number(this.props.items.item.next.slice(this.props.items.item.next.length - 1))-1;
      }else {
        numPage = Number(this.props.items.item.previous.slice(this.props.items.item.previous.length-1))+1;
      }

      return (
        <div className="container">
          <h1>{this.props.items.section}</h1>
          <Row>{filtersAvailable}</Row>

          <ItemList>
            {children}
          </ItemList>
          <Row>
            <Col s={6} m={5}>{prevPage}</Col>
            <Col s={1} m={2} className="center-align"><Button floating large className="teal">{numPage}</Button></Col>
            <Col s={5} m={5} className="right-align">{nextPage}</Col>
          </Row>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderList()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    items: state.items
  };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({fetchStarwars: fetchStarwars, fetchSchema: fetchSchema}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ItemListContainer);
