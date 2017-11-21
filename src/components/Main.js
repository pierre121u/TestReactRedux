import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ItemListContainer from '../containers/ItemListContainer';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={ItemListContainer}/>
    </Switch>
  </main>
)

export default Main;
