import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { credentialsObj } from '../credentials';

const {  GOOGLE_API_KEY } = credentialsObj;

const mapStyles = {
  width: '100%',
  margin: 'auto'
  // display: 'flex',
  // alignItems: 'center',
  // justifyContent: 'center',
};

function MapContainer(props) {
  // console.log('searchMaps props', props);
  const {street, city, state, country, latitude, longitude } = props;
  const parameters = `${street}%${city}%${state}%${country}%`;
  console.log(latitude, longitude)
  console.log(props)
  
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
          lat: latitude,
          lng: longitude
        }
      }
    >
      <Marker position={{lat: latitude, lng: longitude}}/>
      </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY,
})(MapContainer);