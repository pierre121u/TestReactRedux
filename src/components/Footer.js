import React, { Component } from 'react';
import { Footer } from 'react-materialize';

export default class FooterCo extends Component {
  render() {
    return(
      <Footer copyrights="&copy 2017 Copyright Text"
      	moreLinks={
      		<a className="grey-text text-lighten-4 right" href="https://github.com/pierre121u" target="_blank" rel="noopener noreferrer">Alexandre PIERRE</a>
      	}
        className="teal"
      >

      </Footer>
    )
  }
}
