import React from 'react';
import { Input } from 'react-materialize';

const Filter = (props) => {

    return (
      <Input s={12} m={4} type="text" placeholder={props.filter}
        label={props.filter}
        onChange={props.onchange}
      />
    )
}
export default Filter;
