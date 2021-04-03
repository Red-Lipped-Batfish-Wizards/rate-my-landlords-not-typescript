import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

import {
  Modal,
  Backdrop,
  Fade,
  FormControl,
  Button,
  Box, 
  TextareaAutosize,
  FormControlLabel, 
  FormGroup,
  TextField,
  FormLabel,
  Switch,
  Checkbox,
  Divider,
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
  },
  rating: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  }
}));

const initialAddReviewValues = {
    landlord_id: '',
    streetAddress: '',
    reviewBody: '',
    wouldRentAgain: true,
    friendlinessRating: 5,
    communicationRating: 5,
    responsivenessRating: 5,
    maintenanceRating: 5,
    transactionIssues: false,
    moveInDate: '',
    moveOutDate: '',
    cleanliness: 5,
    neighborsVibes: [],
    propertyIssues: [],
    noiseLevelRating: 0,
};

const AddReview = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
//   const [hover, setHover] = React.useState(-1);
  const landlordReviewOpts = ['Friendliness', 'Communication', 'Responsiveness', 'Maintenance']
  const propertyReviewOpts = ['Cleanliness', 'Noise Level Rating', ]
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

    const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };

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
              <h2 id="transition-modal-title">Landlord Review</h2>
              <form onSubmit={formik.handleSubmit}>
                {console.log(formik.errors)}
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
                />
                <Divider />
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
                />
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
                <TextareaAutosize 
                  id="reviewBody"
                  name="reviewBody"
                  value={formik.values.reviewBody}
                  onChange={formik.handleChange}
                  aria-label="empty textarea" 
                  placeholder="Empty" 
                  rowsMin={10}
                />
                <Button color="primary" variant="contained" fullWidth type="submit">
                  Submit
                </Button>
                {/* {landlordReviewOpts.map(option => (
                  <>
                    <p>{option}</p>
                    <div className={classes.rating}>
                      <Rating 
                        name={option}
                        value={option}
                        precision={1}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                        }}
                      />
                      {option.value !== null && <Box ml={2}>{labels[option.hover !== -1 ? option.hover : option.value]}</Box>}
                    </div>
                </>
                ))} */}
                {/* {propertyReviewOpts.map( option => (
                  <>
                    <p>{option}</p>
                    <div className={classes.rating}>
                      
                      <Rating 
                        name={option}
                        value={option}
                        precision={1}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                        }}
                      />
                      {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                    </div>
                </>
                ))} */}
              </form>
            </div>
            </Fade>
        </Modal>
    </div>
  );
};

export default AddReview;



{/* <FormControl>
                  <FormControl component="fieldset" className={classes.formControl}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={false} name="Yes" />}
                        label="Yes"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={true}  name="No" />}
                        label="No"
                      />
                    </FormGroup>
                  </FormControl>
                    {landlordReviewOpts.map( option => (
                      <>
                        <p>{option}</p>
                        <div className={classes.rating}>
                          
                          <Rating 
                            name={option}
                            value={option}
                            precision={1}
                            onChange={(event, newValue) => {
                              setValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                              setHover(newHover);
                            }}
                          />
                          {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                        </div>
                    </>
                    ))}
                    <br />
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel component="legend">Did you have any transaction issues?</FormLabel>
                  <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={false} name="Yes" />}
                        label="Yes"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={true}  name="No" />}
                        label="No"
                      />
                  </FormGroup>
                </FormControl>
                </FormControl>
                <h2>Property Review</h2>
                <FormControl>
                  <TextField
                    id="date"
                    label="Move In Date"
                    type="date"
                    defaultValue="2021-04-03"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    id="date"
                    label="Move Out Date"
                    type="date"
                    defaultValue="2021-04-03"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                {propertyReviewOpts.map( option => (
                      <>
                        <p>{option}</p>
                        <div className={classes.rating}>
                          
                          <Rating 
                            name={option}
                            value={option}
                            precision={1}
                            onChange={(event, newValue) => {
                              setValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                              setHover(newHover);
                            }}
                          />
                          {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                        </div>
                    </>
                    ))}
                    <br />
                    <TextareaAutosize aria-label="empty textarea" placeholder="Empty" rowsMin={10} />
                    <Button variant="contained" color="primary">Submit</Button>
                </FormControl>
                */}