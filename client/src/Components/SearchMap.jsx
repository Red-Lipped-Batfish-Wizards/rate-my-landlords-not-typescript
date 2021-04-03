import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { credentialsObj } from '../credentials';

const {  GOOGLE_API_KEY } = credentialsObj;

const mapStyles = {
  width: '86%',
  height: '86%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // margin: 'auto'
};

function MapContainer(props) {
  // console.log('searchMaps props', props);
  const {latitude, longitude } = props;
  // const parameters = `${street}%${city}%${state}%${country}%`;
  console.log(latitude, longitude)
  console.log(props)

  return (
    // <div style={{height: '80%', width: '80%', alignContent: 'center'}}>
      <Map
        resetBoundsOnResize={true}
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
    // </div>
  );
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY,
})(MapContainer);