import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'

function Dashboard() {
  let [searchValue, setSearchValue] = useState('')
  let [citiesList, setCitiesList] = useState([])

  const change = (value) => {
    setSearchValue(value)
    axios.get(`https://api.teleport.org/api/cities/?search=${value}`)
    .then(res => {
      const citiesList = res.data
      setCitiesList({ citiesList })
    })
  }

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

  return(
    <div className="form-group">
      <div className="row">
        <div className="col-lg-10">
          <input 
            className="form-control"
            value={searchValue}
            onChange={(e) => change(e.target.value)}
          />
        </div>
        <div>
          <Link to={`/list?search=${searchValue}`} className="btn btn-primary">
            Search
          </Link>
        </div>
      </div>

      {!_.isEmpty(citiesList)
        ? renderCitiesList(citiesList)
        : null
      }
    </div>
  )
}

export default Dashboard