import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { credentialsObj } from '../credentials';

const { GOOGLE_MAP_API_KEY } = credentialsObj;

const mapStyles = {
  width: '50%',
  margin: 'auto'
  // display: 'flex',
  // alignItems: 'center',
  // justifyContent: 'center',
};

function MapContainer(props) {
  console.log('searchMaps props', props);
  const {street, city, state, country} = props;
  const parameters = `${street}%${city}%${state}%${country}%`;
  
  // fetch(`https://maps.googleapis.com/maps/api/geocode/json?${parameters}`)
  // .then(data => data.json())
  // .then((data) => console.log(data));


  return (
    <Map
      google={props.google}
      zoom={14}
      style={mapStyles}
      initialCenter={
        {
          lat: -1.2884,
          lng: 36.8233
        }
      }
    />
  );
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAP_API_KEY,
})(MapContainer);