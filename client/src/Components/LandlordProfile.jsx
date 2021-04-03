import React, { useRef, useState }  from 'react'
import Container from '@material-ui/core/Container'
import StatBox from './StatBox'
import ReviewBox from './ReviewBox'

// import '../Style/LandlordProfile.css';
import { gql, useQuery } from '@apollo/client';
import {GET_ALL_LANDLORDS} from './Utils'

function LandLordProfile (props){
  console.log(props)
  console.log('look here for state', typeof(props.location.state), props.location.state)

  const { loading, data, error } = useQuery(
    GET_ALL_LANDLORDS,
    {variables: {id: props.location.state}} 
  );


  // console.log('landlordprofile data', data);
  // console.log('data', data);

  const [example, setExample] = useState(
    {
      LandlordStats: {
        name: "landlord1",
        overallRating: 4.7,
        wouldRentAgainLevel: 4.5,
        tags: ["apple pie, test user 1, this better work"],
        friendlinessRating: 4.5,
        communicationRating: 4.2,
        maintenanceRating: 4.9,
        responsivenessRating: 4.0,
        transactionsIssues: 4.0,
      },
      PropertyStats: {
      },
      Reviews: [
        {
          landlordReview: {
            // wouldRentAgain: true,
            friendlinessRating: 3.0,
            communicationRating: 4.0, 
            // responsivenessRating: 3.0,
            maintenanceRating: 4.0,
            // transactionIssues: false
          },
          propertyReview: {
            moveInDate: "2/3/19",
            moveOutDate: "9/10/19",
            // cleanliness: 3.0,
            // neighborsVibes: ["great, quiet, noisy, everything"],
            // propertyIssues: ["squeky floorsss squeek suehfnp9ieo"],
            // noiseLevelRating: 1.0,
          },
          reviewBody: 'this landlord was horrible. he didnt allow pets so he obviously doesnt have a heart',
          user: 'user123'
        },
        {
          landlordReview: {
            // wouldRentAgain: true,
            friendlinessRating: 3,
            communicationRating: 2, 
            // responsivenessRating: 3,
            maintenanceRating: 4,
            // transactionIssues: true,
          },
          propertyReview: {
            moveInDate: "2/3/20",
            moveOutDate:  "9/10/20",
            // cleanliness: 4,
            // neighborsVibes: ["great, quiet, noisy, everything"],
            // propertyIssues: ["squeky floorsss squeek suehfnp9ieo"],
            // noiseLevelRating: 2,
          },
          reviewBody: 'this place rocks! i hate pets so this place worked out perfectly for me!',
          user: 'user456'
        },
      ]
    }
  )



  return (
    <Container id='landlordProfile'>
      <h1 className='header'>{example.LandlordStats.name}</h1>
      <StatBox {...example.LandlordStats} />
      <ReviewBox reviews = {example.Reviews} />
    </Container>
  )
}

export default LandLordProfile