import React from 'react';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
    Modal,
    Backdrop,
    Fade,
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    Button,
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
  },
}));

const AddReview = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
//   const formik = useFormik({
//     initialValues: {

//     },
//     validationSchema: v
//   });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // addReview(
  //   landlord_id: String
  //   streetAddress: String
  //   reviewBody: String
  //   wouldRentAgain: Boolean
  //   friendlinessRating: Int
  //   communicationRating: Int
  //   responsivenessRating: Int
  //   maintenanceRating: Int
  //   transactionIssues: Boolean
  //   moveInDate: String
  //   moveOutDate: String
  //   cleanliness: Int
  //   neighborsVibes: [String]
  //   propertyIssues: [String]
  //   noiseLevelRating: Int
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
                <h2 id="transition-modal-title">Transition modal</h2>
                <p id="transition-modal-description">react-transition-group animates me.</p>
                <FormControl>
                    <InputLabel htmlFor="my-input">Email address</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                </FormControl>
            </div>
            </Fade>
        </Modal>
    </div>
  );
};

export default AddReview;