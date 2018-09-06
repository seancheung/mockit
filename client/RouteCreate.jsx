import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const style = {
    menu: {
        witdh: 200
    }
};

class RouteCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = { method: props.template.methods[0], path: '' };
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.closeHandler}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add New Route</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please choose the <b>METHOD</b> and set the <b>PATH</b>{' '}
                        of the new route.
                    </DialogContentText>
                    <TextField
                        name="method"
                        select
                        label="Method"
                        margin="normal"
                        SelectProps={{
                            MenuProps: {
                                className: this.props.classes.menu
                            }
                        }}
                        value={this.state.method}
                        onChange={this.handleChange.bind(this)}
                    >
                        {this.props.template.methods.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        name="path"
                        autoFocus
                        margin="dense"
                        label="Path"
                        fullWidth
                        value={this.state.path}
                        onChange={this.handleChange.bind(this)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeHandler} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={this.props.completeHandler}
                        color="primary"
                    >
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

}

export default withStyles(style)(RouteCreate);
