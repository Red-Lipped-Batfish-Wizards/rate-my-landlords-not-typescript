import React, { useRef, useState, useEffect } from 'react';
import '../Style/App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { QueryObj } from './Utils'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

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
      
  }, [value])

  // const [query, setQuery] = useState<QueryObj| undefined> (undefined)
  

  // const HandleClick = async (event: Object) => {
  //   let queryObj: QueryObj = {address: "default", city: "default", zipcode:"default"};

  //   if (searchInputRef.current) {
  //     queryObj = {
  //       address: searchInputRef.current['addressSearchBar'].value,
  //       city: searchInputRef.current['citySearchBar'].value,
  //       zipcode: searchInputRef.current['zipSearchBar'].value
  //     };

  //     await setQuery(queryObj);
  //     console.log(query)
  //     history.push({
  //       pathname: "/searchresults",
  //       state: {
  //         query: queryObj
  //       }
  //     })
  //   }
  // }

  // const handleChange = () => {
  //   if(search2Ref && search2Ref.current) {
  //     const searchString: (String) = search2Ref.current.value
  //     console.log(searchString)
  //   }

  // }

  // return loading ? 
  // (<Spinner />)
  // :  
  return (

      <div className="SearchBar">
        <h1>RATEMYLANDLORDS</h1>
        <h2>Enter your city, zip code, or address to get started</h2>
        {/* <form ref={searchInputRef} noValidate autoComplete="off">
          {/* <TextField id="standard-basic" label="Standard" /> */}
          {/* <TextField id="filled-basic" label="Filled" variant="filled" /> */}
          {/* <TextField name={"addressSearchBar"} label="Address" variant="outlined"/>
          <TextField name={"citySearchBar"} label="City" variant="outlined"/>
          <TextField name={"zipSearchBar"} label="Zip Code" variant="outlined"/>
        </form>
        <Button variant="contained"  onClick={()=>HandleClick({123:456})}>Search</Button>

        <form> */}
          {/* <input type = "search" id="search2" ref={search2Ref} onChange={handleAddressSearch}/> */}
          <GooglePlacesAutocomplete 
            // apiKey={process.env.GOOGLE_API_KEY}
            apiKey="AIzaSyBopeNaNuJXhcVfRvUrjnR1UVm0uRmdx3Y"
            selectProps={{value,onChange: setValue}}
            autocompletionRequest={{componentRestrictions: {country: ['us']}}}
          />
        {/* </form> */}
      </div>
  );
}

export default SearchBar
