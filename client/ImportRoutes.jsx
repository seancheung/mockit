import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withStyles } from '@material-ui/core/styles';

const styles = {};

export const ImportRoutes = ({ open, closeHandler, importHandler }) => (
    <Dialog
        open={open}
        onClose={closeHandler}
        aria-labelledby="import-dialog-title"
    >
        <DialogTitle id="import-dialog-title">Import Routes</DialogTitle>
        <DialogContent>
            <DialogContentText>Import Routes</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={closeHandler} color="primary">
                Cancel
            </Button>
            <Button onClick={importHandler} color="secondary">
                Import
            </Button>
        </DialogActions>
    </Dialog>
);

export default withStyles(styles)(ImportRoutes);
