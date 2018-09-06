import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class RouteDelete extends React.Component {

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.closeHandler}
                aria-labelledby="delete-dialog-title"
            >
                <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeHandler} color="primary">
                        No
                    </Button>
                    <Button
                        onClick={this.props.deleteHandler}
                        color="secondary"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

}
