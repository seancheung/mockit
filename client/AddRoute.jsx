import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    menu: {
        witdh: 200
    },
    field: {
        display: 'block'
    }
};

export const Basic = ({
    classes,
    template,
    method,
    path,
    changeHandler,
    cancelHandler,
    contineHandler
}) => (
    <React.Fragment>
        <DialogContent>
            <DialogContentText>
                Please choose the <b>METHOD</b> and set the <b>PATH</b> of the
                new route.
            </DialogContentText>
            <TextField
                name="method"
                select
                label="Method"
                margin="normal"
                required
                className={classes.field}
                SelectProps={{
                    MenuProps: {
                        className: classes.menu
                    }
                }}
                value={method}
                onChange={changeHandler}
            >
                {template.methods.map(option => (
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
                className={classes.field}
                value={path}
                onChange={changeHandler}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={cancelHandler} color="secondary">
                Cancel
            </Button>
            <Button
                onClick={contineHandler}
                color="primary"
                disabled={!method || !path}
            >
                Continue
            </Button>
        </DialogActions>
    </React.Fragment>
);

export const Details = ({
    classes,
    template,
    code,
    type,
    body,
    encoding,
    changeHandler,
    cancelHandler,
    addHandler
}) => (
    <React.Fragment>
        <DialogContent>
            <DialogContentText>Please set route options</DialogContentText>
            <TextField
                name="code"
                select
                label="Status Code"
                margin="normal"
                required
                className={classes.field}
                SelectProps={{
                    MenuProps: {
                        className: classes.menu
                    }
                }}
                value={code}
                onChange={changeHandler}
            >
                {Object.entries(template.codes).map(([k, v]) => (
                    <MenuItem key={k} value={parseInt(k)}>
                        {k} {v}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                name="type"
                select
                label="Content Type"
                margin="normal"
                required={false}
                className={classes.field}
                SelectProps={{
                    MenuProps: {
                        className: classes.menu
                    }
                }}
                value={type}
                onChange={changeHandler}
            >
                {template.mime.map(option => (
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
                className={classes.field}
                SelectProps={{
                    MenuProps: {
                        className: classes.menu
                    }
                }}
                value={encoding}
                onChange={changeHandler}
            >
                {template.encodings.map(option => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                name="body"
                label="Body"
                className={classes.field}
                multiline
                margin="normal"
                value={body}
                onChange={changeHandler}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={cancelHandler} color="secondary">
                Cancel
            </Button>
            <Button onClick={addHandler} color="primary">
                Add
            </Button>
        </DialogActions>
    </React.Fragment>
);

export class AddRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            method: 'GET',
            path: '',
            code: 200,
            bypass: false,
            delay: 0,
            headers: {},
            body: '',
            validate: false,
            type: '',
            encoding: ''
        };
    }

    render() {
        return (
            <Dialog
                aria-labelledby="create-dialog-title"
                open={this.props.open}
                onClose={this.handleCancel.bind(this)}
            >
                <DialogTitle id="create-dialog-title">
                    Add New Route
                </DialogTitle>
                {this.state.validate ? (
                    <Details
                        {...this.state}
                        classes={this.props.classes}
                        template={this.props.template}
                        changeHandler={this.handleChange.bind(this)}
                        cancelHandler={this.handleCancel.bind(this)}
                        addHandler={this.handleAdd.bind(this)}
                    />
                ) : (
                    <Basic
                        {...this.state}
                        classes={this.props.classes}
                        template={this.props.template}
                        changeHandler={this.handleChange.bind(this)}
                        cancelHandler={this.handleCancel.bind(this)}
                        contineHandler={this.handleContinue.bind(this)}
                    />
                )}
            </Dialog>
        );
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleCancel() {
        this.setState({ validate: false });
        this.props.closeHandler();
    }

    async handleContinue() {
        const success = await this.props.validateHandler(
            this.state.method,
            this.state.path
        );
        this.setState({ validate: success });
    }

    async handleAdd() {
        await this.props.createHandler(this.state);
        this.setState({ validate: false });
        this.props.closeHandler();
    }

}

export default withStyles(styles)(AddRoute);
