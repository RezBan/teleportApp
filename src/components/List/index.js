import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import axios from 'axios'

function List() {
  let [citiesList, setCitiesList] = useState([])

  useEffect(() => {
    const href = window.location.search
    const searchValue = href.substring(href.lastIndexOf('=') + 1)

    if (searchValue !== '') {
      axios.get(`https://api.teleport.org/api/cities/?search=${searchValue}`)
        .then(res => {
          const citiesList = res.data;
          setCitiesList({ citiesList });
        })
    } else {
      setCitiesList([]);
    }
  }, [])

  const renderCitiesList = (citiesList) => {
    return (
      <div className="pt-2">
        {_.map(citiesList.citiesList._embedded["city:search-results"], item => {
          const itemHref = item._links['city:item'].href
          const pushValue = itemHref.substring(itemHref.lastIndexOf(':') + 1)
          return (
            <div key={item.matching_full_name}>
              <Link to={`/search/${pushValue}`}>
                {item.matching_full_name}
              </Link>
            </div>
          )
        })}
      </div>
    )
  }


  return (
    !_.isEmpty(citiesList)
      ? renderCitiesList(citiesList)
      : <div className="text-center">
          <h2>There is no cities according to your request</h2>
          <Link className="btn btn-primary" to='/'>Back</Link>
        </div>
  )
}

export default List
