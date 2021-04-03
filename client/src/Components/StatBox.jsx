import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
// import FormLabel from '@material-ui/core/FormLabel';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 80,
      width: 150,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: theme.palette.text.secondary
    },
    control: {
      padding: theme.spacing(2),
    },
  }),
);

export default function StatBox(props) {
  // const [spacing, setSpacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();

  console.log('props',props);

  const {
    overallRating,
    // wouldRentAgainLevel, 
    // tags, 
    friendlinessRating, 
    communicationRating, 
    maintenanceRating,
    // transactionsIssues,
  } = props;

  const ratingsObj = {
    Overall: overallRating,
    Friendliness: friendlinessRating,
    Communication: communicationRating,
    Maintenance: maintenanceRating,
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="flex-start" spacing={2}>
          {Object.keys(ratingsObj).map((value) => (
            <Grid key={value} item>
              {/* <Paper className={classes.paper}>{ratingsObj[value]}</Paper> */}
              <Paper className={classes.paper}>
                
                {`${value}`}
                <br></br>
                <Rating name="half-rating" defaultValue={(Math.round(ratingsObj[value] * 100) / 100).toFixed(1)} precision={0.5} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
