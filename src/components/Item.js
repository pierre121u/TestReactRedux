import React from 'react';
import { Col, Card, ProgressBar } from 'react-materialize';

const Item = (props) => {

    let itemLinksResume = [];

    let itemKeys = [];
    let itemVals = [];
    for (var variable in props.item) {
      if (props.item.hasOwnProperty(variable)) {
        if (variable !== 'created' && variable !== 'edited' && !variable.includes('Resume') && variable !== 'name'
        && variable !== 'species' && variable !== 'starships' && variable !== 'vehicles' && variable !== 'planets'
        && variable !== 'films' && variable !== 'pilots' && variable !== 'people' && variable !== 'residents'
        && variable !== 'url') {
          if (props.item[variable] !== '' && props.item[variable] !== null) {
            itemKeys.push(variable)
            itemVals.push(props.item[variable])
          }
        }else if (variable === 'ResumeSpecies' || variable === 'ResumeStarships' || variable === 'ResumeVehicles'
        || variable === 'ResumePlanets' || variable === 'ResumeFilms' || variable === 'ResumePilots'
        || variable === 'ResumePeople' || variable === 'ResumeResidents') {
          if(props.item[variable].length > 0)
          {
            let link = {'type': variable.slice(6), tab: props.item[variable]}
            itemLinksResume.push(link);
          }
        }
      }
    }
    const infos = itemKeys.map((item,i) => (
      <p key={i}><b>{item}</b> : {itemVals[i]}</p>
    ))

    const links = itemLinksResume.map((link) => (
      <Col s={10}>
        <b>{link.type} : </b>
        {link.tab.map((l)=>(<p>{l.title || l.name}</p>))}
        <div className="divider"></div>
      </Col>
    ))


    return (
      <Col m={6} s={12}>
        <Card className='blue-grey darken-1 item' textClassName='white-text' title={props.item.name}>
          <div className="divider"></div>
          {infos}
          <div className="divider"></div>
          <div>{links || <Col s={12}><ProgressBar /></Col>}</div>
        </Card>
      </Col>
    )
}
export default Item;
