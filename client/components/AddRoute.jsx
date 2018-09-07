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
    contineHandler,
    canContinue
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
                disabled={canContinue}
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

    render() {
        return (
            <Dialog aria-labelledby="create-dialog-title">
                <DialogTitle id="create-dialog-title">
                    Add New Route
                </DialogTitle>
                {this.props.basic ? (
                    <Basic
                        classes={this.props.classes}
                        template={this.props.template}
                    />
                ) : (
                    <Details classes={this.props.classes} />
                )}
            </Dialog>
        );
    }

}

export default withStyles(styles)(AddRoute);
