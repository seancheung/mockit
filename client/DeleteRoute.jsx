import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withStyles } from '@material-ui/core/styles';

const styles = {};

export const DeleteRoute = ({ open, closeHandler, deleteHandler }) => (
    <Dialog
        open={open}
        onClose={closeHandler}
        aria-labelledby="delete-dialog-title"
    >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to delete?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={closeHandler} color="primary">
                No
            </Button>
            <Button onClick={deleteHandler} color="secondary">
                Delete
            </Button>
        </DialogActions>
    </Dialog>
);

export default withStyles(styles)(DeleteRoute);
