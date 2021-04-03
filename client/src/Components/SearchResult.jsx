import React from 'react';
import { useQuery } from '@apollo/client';
// import { useHistory } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import { GET_RESULTS} from './Utils'
import ResultsTable from './ResultsTable'
import SearchMap from './SearchMap'

function SearchResult(props){
  console.log(props.location.state.query)
  const { loading, data } = useQuery(
    GET_RESULTS,
    {variables: props.location.state.query}
  );

  

  if (loading) {
    return (
      <div className='loader'>
        <LinearProgress />
        {/* <CircularProgress color="secondary" /> */}
      </div>
    )
  }

  if (data) {
    console.log('server response:', data)
    const { findLandlordsByAddress: {latitude, longitude }} = data
    console.log(latitude, longitude)
    return (
      <div>
        <h1>RATE MY LANDLORD</h1><br />

        {/* <div>{JSON.stringify(data)}</div> */}
        <ResultsTable {...data.findLandlordsByAddress}/>
        <br></br>
        <SearchMap {...props.location.state.query} latitude={latitude} longitude={longitude}/>
      </div>
    )
  }

  return (
    <div>
      FAILED
    </div>
  )
}
export default SearchResult