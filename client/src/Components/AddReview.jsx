import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

import {
  Modal,
  Backdrop,
  Fade,
  Button,
  TextareaAutosize,
  FormControlLabel, 
  TextField,
  Switch,
  Divider,
  Grid,
  FormGroup,
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top:'50%',
    left:'10%',
    bottom: '20%',
    overflowY:'scroll',
    height: '80%',
    width: '50%'
  },
  textArea: {
    width: '100%'
  },
  submitButton: {
    padding: '10px'
  }
}));

const initialAddReviewValues = {
    landlord_id: '',
    streetAddress: '',
    reviewBody: '',
    wouldRentAgain: true,
    friendlinessRating: 0,
    communicationRating: 0,
    responsivenessRating: 0,
    maintenanceRating: 0,
    transactionIssues: false,
    moveInDate: '',
    moveOutDate: '',
    cleanliness: 5,
    neighborsVibes: [],
    propertyIssues: [],
    noiseLevelRating: 0,
};

const AddReview = ({setExample}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(-1);
  const [landlordReviewOptions] = useState({

  })

  const landlordReviewOpts = {'Friendliness': 'friendlinessRating', 'Communication': 'communicationRating', 'Responsiveness': 'responsivenessRating', 'Maintenance': 'maintenanceRating'}
  const propertyReviewOpts = {'Cleanliness': 'cleanlinessRating', 'Noise Level Rating': 'noiseLevelRating', }
  const validationSchema = yup.object({
    landlord_id: yup.string().required(),
    streetAddress: yup.string().required(),
    reviewBody: yup.string(),
    wouldRentAgain: yup.boolean(),
    friendlinessRating: yup.number().required().positive().integer(),
    communicationRating: yup.number().required().positive().integer(),
    responsivenessRating: yup.number().required().positive().integer(),
    maintenanceRating: yup.number().required().positive().integer(),
    transactionIssues: yup.boolean(),
    moveInDate: yup.string().required(),
    moveOutDate: yup.string().required(),
    cleanliness: yup.number().required().positive().integer(),
    noiseLevelRating: yup.number().required().positive().integer(),
  })
  const formik = useFormik({
    initialValues: initialAddReviewValues,
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
        
      // alert(JSON.stringify(values));
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Button variant="outlined" text-align="right" onClick={handleOpen}>Add Review</Button>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <form onSubmit={formik.handleSubmit}>
                {console.log(formik.errors)}
                <Grid 
                  direction="column"
                  justify="left"
                  alignItems="left"
                  container 
                  spacing={3} 
                >
                  <h2>Landlord Review</h2>
                  <FormGroup>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formik.values.wouldRentAgain}
                            onChange={formik.handleChange}
                            id="wouldRentAgain"
                            name="wouldRentAgain"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                          />}
                        label="Would you rent again?"
                        labelPlacement="start"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                          checked={formik.values.transactionIssues}
                          onChange={formik.handleChange}
                          id="transactionIssues"
                          name="transactionIssues"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />}
                        label="Did you have any transaction issues?"
                        labelPlacement="start"
                      />
                    </Grid>
                  </FormGroup>
                  <Divider />
                  <Grid 
                    container 
                    item xs={12} 
                    spacing={3}
                  >
                    <Grid item xs={6}>
                      <TextField
                        label="Move In Date"
                        type="date"
                        name="moveInDate"
                        id="moveInDate"
                        onChange={formik.handleChange}
                        defaultValue={formik.values.moveInDate}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Move Out Date"
                        type="date"
                        name="moveOutDate"
                        id="moveOutDate"
                        onChange={formik.handleChange}
                        defaultValue={formik.values.moveOutDate}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <TextareaAutosize 
                      id="reviewBody"
                      name="reviewBody"
                      value={formik.values.reviewBody}
                      onChange={formik.handleChange}
                      aria-label="empty textarea" 
                      placeholder="Comment" 
                      rowsMin={10}
                      className={classes.textArea}
                    />
                  </Grid>
                  <Divider />
                  <Grid 
                    container 
                    // direction="row"
                    // justify="right"
                    // alignItems="right"
                    container 
                    item xs={12} 
                    spacing={3}
                  >
                    {Object.keys(landlordReviewOpts).map(option => (
                      <Grid item xs={6} sm={6} key={option}>
                        <p>{option}</p>
                        <Rating 
                          id={landlordReviewOpts[option]}
                          name={landlordReviewOpts[option]}
                          value={parseInt(formik.values[landlordReviewOpts[option]])}
                          precision={1}
                          onChange={formik.handleChange}
                          onChangeActive={formik.handleChangeActive}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  <Divider />
                  <h2>Property Review</h2>
                  <Grid 
                    container
                    item xs={12} 
                    spacing={3}
                  >
                    {Object.keys(propertyReviewOpts).map( option => (
                      <Grid item xs={6} sm={6} key={option}>
                        <p>{option}</p>
                        <div className={classes.rating}>
                          <Rating 
                          id={landlordReviewOpts[option]}
                            name={propertyReviewOpts[option]}
                            value={parseInt(formik.values[propertyReviewOpts[option]])}
                            precision={1}
                            onChange={formik.handleChange}
                            onChangeActive={formik.handleChangeActive}
                          />
                        </div>
                      </Grid>
                    ))}
                  </Grid> 
                  <br/>
                  <Button color="primary" variant="contained" type="submit">
                    Submit
                  </Button>  
                </Grid>
              </form>
            </div>
          </Fade>
        </Modal>
    </div>
  );
};

export default AddReview;
