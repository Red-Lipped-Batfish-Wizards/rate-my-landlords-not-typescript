import React from "react";
// import ReactDOM from "react-dom";
import Rating from '@material-ui/lab/Rating';
import { Avatar, Grid, Paper, Button } from "@material-ui/core";
import AddReview from './AddReview'

// import "./styles.css";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";


export default function ReviewBox(props) {
/*
Reviews: [
  {
    landlordReview: {
      wouldRentAgain: true,
      friendlinessRating: 3.0,
      communicationRating: 4.0, 
      responsivenessRating: 3,
      maintenanceRating: 4,
      transactionIssues: false
    },
    propertyReview: {
      moveInDate: "2/3/19",
      moveOutDate: "9/10/19",
      cleanliness: 3,
      neighborsVibes: ["great, quiet, noisy, everything"],
      propertyIssues: ["squeky floorsss squeek suehfnp9ieo"],
      noiseLevelRating: 1,
      user: "user1",
    },
    reviewBody: 'this place sucks',
    user: 'user123'
  },
  {
    landlordReview: {
      wouldRentAgain: true,
      friendlinessRating: 3,
      communicationRating: 2, 
      responsivenessRating: 3,
      maintenanceRating: 4,
      transactionIssues: true,
    },
    propertyReview: {
      moveInDate: "2/3/20",
      moveOutDate:  "9/10/20",
      cleanliness: 4,
      neighborsVibes: ["great, quiet, noisy, everything"],
      propertyIssues: ["squeky floorsss squeek suehfnp9ieo"],
      noiseLevelRating: 2,
    },
    reviewBody: 'this place rocks!!!',
    user: 'user456'
  },
]
*/
  // console.log('Review Box props', props);
  const {reviews} = props;

  const ratingMap = {
    friendlinessRating: 'Friendliness',
    communicationRating: 'Communication',
    maintenanceRating: 'Maintenance',
    moveInDate: 'Move-in Date',
    moveOutDate: 'Move-out Date'
  }

  return (
    <div style={{ padding: 14 }} className="ReviewBox">
      <h1 font-color = 'white'>Reviews</h1>
      <AddReview />
      {/* <Paper style={{ padding: "40px 20px" }}> */}
      {reviews.map( (review, index) => (
        <Paper style={{ padding: "40px 20px", marginTop: 25 }}>
          <Grid container spacing={3}>
            <Grid item xs={1}>
              <Avatar alt={review.user} src={imgLink} />
              <h4>{review.user}</h4>
            </Grid>
            <Grid justify="flex-start" item xs={5}>
              {/* <h4 style={{ margin: 0, textAlign: "left" }}>{review.user}</h4> */}
              {Object.keys(review.landlordReview).map(landlordReviewProps => (
                <div>{ratingMap[landlordReviewProps]}:   
                <Rating name="size-small" size="small" defaultValue={review.landlordReview[landlordReviewProps]} precision={0.1}/>
                </div>
              ))}
            </Grid>
            <Grid justify="flex-start" item xs={5}>
              {/* <p style={{ textAlign: "left" }}>
                property review
              </p> */}
              {Object.keys(review.propertyReview).map((propertyReviewProps,index)=> (
                <div>{ratingMap[propertyReviewProps]}: <b>{review.propertyReview[propertyReviewProps]}</b></div>
              ))}
            </Grid>
            <Grid justify="flex-start" item xs={12}>
              {review.reviewBody}
              <p style={{ textAlign: "left", color: "gray" }}>
                posted {index} minute ago
              </p>
            </Grid>
          </Grid>
      </Paper>
        ))}
      {/* </Paper> */}
    </div>
  );
}
