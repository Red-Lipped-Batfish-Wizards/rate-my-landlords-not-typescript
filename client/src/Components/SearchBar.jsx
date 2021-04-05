import React, { useState, useEffect, useRef } from 'react';
import '../Style/App.css';
import { useHistory } from 'react-router-dom';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { GoogleLogin } from 'react-google-login';
import {
  Button,
  Container,
  Paper,
  Fab,
 } from '@material-ui/core';
import { credentialsObj } from '../credentials'
const { GOOGLE_API_KEY, GOOGLE_OAUTH_CLIENT_ID } = credentialsObj;

function SearchBar (){
  let history = useHistory()
  const loginButttonRef = useRef();
  const [value, setValue] = useState(null)
  const [username, setUsername] = useState("there");

  const responseGoogle = (response) => {
    console.log(response);
    // history.replace('/');
    setUsername(response.profileObj.name)
  }

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
          name: "Htin Linn Aung",
          query: searchQuery
        }
      })
    }
  // eslint-disable-next-line 
  }, [value])
  

  return (
      <Container>
        <div className="SearchBar">
          <Paper variant="outlined">
            <img src="logo.png" />
          </Paper>
          <h1>Hi, {username}!</h1>
          <h2>Enter your city, zip code, or address to get started</h2>
            <GooglePlacesAutocomplete 
              apiKey={GOOGLE_API_KEY}
              selectProps={{value,onChange: setValue}}
              autocompletionRequest={{componentRestrictions: {country: ['us']}}}
            />
            <br />
            <Button ref={loginButttonRef} />
            <GoogleLogin
              clientId={GOOGLE_OAUTH_CLIENT_ID}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
            />
        </div>
      </Container>
  );
}

export default SearchBar
