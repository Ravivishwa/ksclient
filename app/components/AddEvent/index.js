// import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import MuiDialogTitle from '@material-ui/core/DialogTitle';
// import MuiDialogContent from '@material-ui/core/DialogContent';
// import MuiDialogActions from '@material-ui/core/DialogActions';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
// import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
// import Grid from '@material-ui/core/Grid';
// import { DateRange, Room } from '@material-ui/icons';
//
// const styles = theme => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(2),
//   },
//   closeButton: {
//     position: 'absolute',
//     right: theme.spacing(1),
//     top: theme.spacing(1),
//     color: theme.palette.grey[500],
//   },
// });
//
// const DialogTitle = withStyles(styles)(props => {
//   const { children, classes, onClose, ...other } = props;
//   return (
//     <MuiDialogTitle disableTypography className={classes.root} {...other}>
//       <Typography variant="h6">{children}</Typography>
//       {onClose ? (
//         <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </MuiDialogTitle>
//   );
// });
//
// const DialogContent = withStyles(theme => ({
//   root: {
//     padding: theme.spacing(2),
//
//   },
// }))(MuiDialogContent);
//
// const DialogActions = withStyles(theme => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(1),
//   },
// }))(MuiDialogActions);
//
// export default function CustomizedDialogs(props) {
//   return (
//     <div>
//       <Dialog onClose={props.close} aria-labelledby="customized-dialog-title" open={props.open} fullWidth>
//         <DialogTitle id="customized-dialog-title" onClose={props.close}>
//           Create Event
//         </DialogTitle>
//         <DialogContent dividers>
//           <div>
//             <Grid container spacing={1} alignItems="flex-end" >
//               <Grid item>
//                 <Room />
//               </Grid>
//               <Grid item xs={11}>
//                 <TextField
//                   value={props.location}
//                   onChange={e => props.selectValue('location',e.target.value)}
//                   label="Location"
//                   name="location"
//                   fullWidth
//                 />
//               </Grid>
//             </Grid>
//           </div>
//           <div>
//             <Grid container spacing={1} alignItems="flex-end">
//               <Grid item>
//                 <DateRange />
//               </Grid>
//               <Grid item xs={11}>
//                 <TextField
//                   label="Date"
//                   value={props.date}
//                   onChange={e => props.selectValue('date',e.target.value)}
//                   name={"date"}
//                   fullWidth
//                 />
//               </Grid>
//             </Grid>
//           </div>
//         </DialogContent>
//         <DialogActions >
//           <Button autoFocus onClick={props.addEvent} color="primary" style={{margin:"auto"}}>
//             <Typography >Proceed</Typography>
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

import React, { Component } from 'react'
import { Button, Modal,Icon,Grid,Segment,Input } from 'semantic-ui-react'
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';

class AddEvent extends Component {

  render() {
    return (
      <div>
        <Modal size={'tiny'} open={this.props.open}>
          <Modal.Header style={{backgroundColor:"lightgray"}}>
            Add Event:
            <Icon name='times circle' style={{float:"right"}} onClick={() => this.props.close()} color={'grey'}/>
          </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <Input
                  icon='map marker alternate'
                  iconPosition='left'
                  placeholder='Location'
                  onChange={e => this.props.selectValue('location',e.target.value)}

                />
              </Form.Field>
              <Form.Field>
                <Input
                  icon='calendar alternate'
                  iconPosition='left'
                  placeholder='Date'
                  value={this.props.date}
                  onChange={e => this.props.selectValue('date',e.target.value)}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button content='Proceed' fluid onClick={this.props.addEvent}/>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default AddEvent

