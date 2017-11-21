const apiURL = "https://swapi.co/api/";

export function fetchStarwars(section, filters, values) {
  let url = "";

  if (section.includes('page'))
  {
    url = section;
    let tabUrl = section.split('/');
    section = tabUrl[tabUrl.length-2];
  }
  else
  {
    url = apiURL + section;
  }
  if (section.includes('/'))
    section = section.slice(0,-1);

  section = section.charAt(0).toUpperCase() + section.slice(1);

  return (dispatch) => {
    fetch(url)
    .then(
      (results) => {
        return results.json()
      }
    )
    .then(
      function(data){
        data.results.forEach(function(item,i){
          for (var key in item) {
            if (item.hasOwnProperty(key)) {
              if (key === 'species' || key === 'starships' || key === 'vehicles' || key === 'planets' || key === 'films' || key === 'pilots' || key === 'people' || key === 'residents') {
                if (item[key].length > 0) {
                  // let newKey = key + 'Resume';
                  let newKey = 'Resume' + key.charAt(0).toUpperCase() + key.slice(1);
                  item[newKey] = [];
                  item[key].forEach(function(url){
                    fetch(url)
                    .then((results) => {return results.json()})
                    .then(function(res){
                      item[newKey].push(res);
                    })
                    .catch(error => {
                      throw(error);
                    });
                  })
                }
              }
            }
          }
        })

        return dispatch({
          type: 'FETCH_STARWARS',
          payload: data,
          section: section,
          filters: filters,
          values: values
        })
      }
    )
    .catch(error => {
      throw(error);
    });
  }
}

export function fetchSchema(section)
{
  return (dispatch) => {
    fetch(apiURL + section.toLowerCase() + '/schema')
    .then((results) => {return results.json()})
    .then(data => dispatch({
      type: 'FETCH_SCHEMA',
      schema : data
    }))
    .catch(error => {
      throw(error);
    });
  }
}

export function fetchOne(url)
{
  return (dispatch) => {
    fetch(url)
    .then((results) => {return results.json()})
    .then(data => dispatch({
      type: 'FETCH_ONE',
      item : data
    }))
    .catch(error => {
      throw(error);
    });
  }
}
