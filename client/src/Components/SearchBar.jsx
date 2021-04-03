import React, { useState, useEffect } from 'react';
import '../Style/App.css';
import { useHistory } from 'react-router-dom';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { credentialsObj } from '../credentials'
const { GOOGLE_API_KEY } = credentialsObj

function SearchBar (){
  let history = useHistory()
  const [value, setValue] = useState(null)

  useEffect(() => {
    console.log(value)
    if(value && value.label) {
      const [streetRes, cityRes, stateRes, countryRes] = value.label.split(",")
      const searchQuery = {
        street: streetRes.trim(), 
        city: cityRes.trim(), 
        state: stateRes.trim(), 
        country: countryRes.trim(),
      }

      history.push({
        pathname: "/searchresults",
        state: {
          query: searchQuery
        }
      })
    }
  // eslint-disable-next-line 
  }, [value])
  

  return (

      <div className="SearchBar">
        <h1>RATEMYLANDLORDS</h1>
        <h2>Enter your city, zip code, or address to get started</h2>

          <GooglePlacesAutocomplete 
            apiKey={GOOGLE_API_KEY}
            selectProps={{value,onChange: setValue}}
            autocompletionRequest={{componentRestrictions: {country: ['us']}}}
          />
      </div>
  );
}

export default SearchBar
