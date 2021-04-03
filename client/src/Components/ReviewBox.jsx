import React from "react";
// import ReactDOM from "react-dom";
import Rating from '@material-ui/lab/Rating';
import { Avatar, Grid, Paper, Button } from "@material-ui/core";
import AddReview from './AddReview'

// import "./styles.css";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";


export default function ReviewBox(props) {

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
