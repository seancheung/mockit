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
import { checkRoute } from './store/http';

const style = {
    menu: {
        witdh: 200
    },
    field: {
        display: 'block'
    }
};

class RouteCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            method: 'GET',
            path: '',
            code: 200,
            type: '',
            encoding: '',
            body: '',
            validate: false
        };
    }

    render() {
        let title, content;
        if (this.state.validate) {
            title = <span>Please set route options</span>;
            content = (
                <React.Fragment>
                    <TextField
                        name="code"
                        select
                        label="Status Code"
                        margin="normal"
                        required
                        className={this.props.classes.field}
                        SelectProps={{
                            MenuProps: {
                                className: this.props.classes.menu
                            }
                        }}
                        value={this.state.code}
                        onChange={this.handleChange.bind(this)}
                    >
                        {Object.entries(this.props.template.codes).map(
                            ([k, v]) => (
                                <MenuItem key={k} value={parseInt(k)}>
                                    {k} {v}
                                </MenuItem>
                            )
                        )}
                    </TextField>
                    <TextField
                        name="type"
                        select
                        label="Content Type"
                        margin="normal"
                        required={false}
                        className={this.props.classes.field}
                        SelectProps={{
                            MenuProps: {
                                className: this.props.classes.menu
                            }
                        }}
                        value={this.state.type}
                        onChange={this.handleChange.bind(this)}
                    >
                        {this.props.template.mime.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        name="encoding"
                        select
                        label="Encoding"
                        margin="normal"
                        required={false}
                        className={this.props.classes.field}
                        SelectProps={{
                            MenuProps: {
                                className: this.props.classes.menu
                            }
                        }}
                        value={this.state.encoding}
                        onChange={this.handleChange.bind(this)}
                    >
                        {this.props.template.encodings.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        name="body"
                        label="Body"
                        className={this.props.classes.field}
                        multiline
                        margin="normal"
                        value={this.state.body}
                        onChange={this.handleChange.bind(this)}
                    />
                </React.Fragment>
            );
        } else {
            title = (
                <span>
                    Please choose the <b>METHOD</b> and set the <b>PATH</b> of
                    the new route.
                </span>
            );
            content = (
                <React.Fragment>
                    <TextField
                        name="method"
                        select
                        label="Method"
                        margin="normal"
                        required
                        className={this.props.classes.field}
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
                        required
                        className={this.props.classes.field}
                        value={this.state.path}
                        onChange={this.handleChange.bind(this)}
                    />
                </React.Fragment>
            );
        }

        return (
            <Dialog
                open={this.props.open}
                onClose={this.handleClose.bind(this)}
                aria-labelledby="create-dialog-title"
            >
                <DialogTitle id="create-dialog-title">
                    Add New Route
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>{title}</DialogContentText>
                    {content}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={this.handleClose.bind(this)}
                        color="secondary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={this.handleContinue.bind(this)}
                        color="primary"
                        disabled={!this.state.method || !this.state.path}
                    >
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    handleClose() {
        this.setState({ validate: false });
        this.props.closeHandler();
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async handleContinue() {
        try {
            await checkRoute(this.state.method, this.state.path);
            this.setState({ validate: true });
        } catch (error) {
            this.setState({ validate: false });
        }
    }

}

export default withStyles(style)(RouteCreate);
