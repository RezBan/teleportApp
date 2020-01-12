import React, { Fragment, useState, useEffect } from 'react'
import _ from 'lodash'
import axios from 'axios'

function Search() {
  let [isEdit, setIsEdit] = useState(false)
  let [cityList, setCityList] = useState([])
  let [cityName, setCityName] = useState('')
  let [country, setCountry] = useState('')

  useEffect(() => {
    const href = window.location.pathname
    const searchValueArr = href.split('/')
    const searchValue = searchValueArr[2]

    async function fetchData() {
      const result = await axios.get(
        `https://api.teleport.org/api/cities/geonameid:${searchValue}`,
      )
      setCityList(result.data)
    }
    fetchData()
  }, [])

  const saveChanges = () => {
    setCityList({
      ...cityList,
      name: cityName,
      _links: {
        ...cityList._links,
        "city:country": {
          ...cityList._links["city:country"],
          name: country
        }
      }
    })
    setIsEdit(false)
  }

  const renderEditButton = (city) => {
    if (isEdit) {
      return (
        <Fragment>
          <button 
            className="btn btn-primary" 
            onClick={() => saveChanges()}
          > 
            Save
          </button>
          <button 
            className="btn btn-secondary ml-2" 
            onClick={() => setIsEdit(false)}
          > 
            Cancel 
          </button>
        </Fragment>
      )
    }
    return (
      <button
        className="btn btn-primary"
        onClick={() => {
          setIsEdit(true)
          setCityName(city.name)
          setCountry(city._links["city:country"].name)
        }}
      >
        Edit
      </button>
    )
  }

  const renderCityInfo = (city) => {
    return (
      <div>
        <div className="mb-2 form-group">
          <span className="mr-2">
            City name:
          </span>
          <span>
            {isEdit
              ? <input
                className="form-control"
                value={cityName}
                name="cityName"
                onChange={(e) => setCityName(e.target.value)}
              />
              : city.name
            }
          </span>
        </div>

        <div className="mb-2">
          <span className="mr-2">
            Country:
          </span>
          <span>
            {isEdit
              ? <input
                className="form-control"
                value={country}
                name="country"
                onChange={(e) => setCountry(e.target.value)}
              />
              : city._links["city:country"].name
            }
          </span>
        </div>

        <div className="mb-2">
          <span className="mr-2">
            Timezone:
          </span>
          <span>
          {city._links["city:timezone"].name}
          </span>
        </div>

        <div className="mb-2">
          <span className="mr-2">
            Population: 
          </span>
          <span>
            {city.population}
          </span>
        </div>

        <div className="mb-2">
          {renderEditButton(city)}
        </div>
      </div>
    )
  }

  return (
    <Fragment>
      {_.size(cityList.error) || _.isEmpty(cityList)
        ? <p>This city was not find.</p>
        : renderCityInfo(cityList)
      }
    </Fragment>
  )
}

export default Search
