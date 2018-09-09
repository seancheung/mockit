import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    content: { minWidth: '300px', color: theme.palette.error.main }
});

export const Message = ({ open, title, content, closeHandler, classes }) => (
    <Dialog
        open={open}
        onClose={closeHandler}
        aria-labelledby="delete-dialog-title"
    >
        <DialogTitle id="delete-dialog-title">{title}</DialogTitle>
        <DialogContent>
            <DialogContentText className={classes.content}>
                {content}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={closeHandler} color="primary">
                OK
            </Button>
        </DialogActions>
    </Dialog>
);

export default withStyles(styles)(Message);
