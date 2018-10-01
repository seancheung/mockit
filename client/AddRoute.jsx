import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogContentText from '@material-ui/core/DialogContentText';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import AceEditor from 'react-ace';
import { typeToMode } from './store/utils';

const styles = {
    menu: {
        witdh: 200
    },
    field: {
        display: 'block'
    },
    flex: {
        display: 'flex',
        alignContent: 'center'
    },
    method: {
        flex: 1
    },
    proxy: {
        marginTop: 'auto'
    },
    url: {
        minWidth: '400px'
    }
};

export const Basic = ({
    classes,
    template,
    method,
    path,
    proxy,
    changeHandler,
    toggleProxyHandler,
    cancelHandler,
    contineHandler
}) => (
    <React.Fragment>
        <DialogContent>
            <DialogContentText>
                Please choose the <b>METHOD</b> and set the <b>PATH</b> of the
                new route.
            </DialogContentText>
            <div className={classes.flex}>
                <TextField
                    name="method"
                    select
                    label="Method"
                    margin="normal"
                    required
                    className={classNames(classes.field, classes.method)}
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
                <FormControlLabel
                    className={classes.proxy}
                    control={
                        <Switch
                            checked={proxy != null}
                            onChange={toggleProxyHandler}
                        />
                    }
                    label="Reverse Proxy"
                />
            </div>
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
    delay,
    type,
    body,
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
                name="delay"
                label="Delay(ms)"
                margin="normal"
                type="number"
                className={classes.field}
                value={delay}
                onChange={changeHandler}
            />
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
            <Typography variant="caption" gutterBottom>
                Body
            </Typography>
            <AceEditor
                mode={typeToMode(type)}
                theme="github"
                className={classes.spacing}
                showPrintMargin={false}
                onChange={value =>
                    changeHandler({ target: { name: 'body', value } })
                }
                editorProps={{ $blockScrolling: true }}
                value={body}
                height="200px"
                width="400px"
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

export const ProxyDetails = ({
    classes,
    remote = '',
    rewrite = '',
    changeHandler,
    cancelHandler,
    addHandler
}) => (
    <React.Fragment>
        <DialogContent>
            <DialogContentText>Please set route options</DialogContentText>
            <TextField
                name="remote"
                label="Remote"
                margin="normal"
                required
                className={classNames(classes.field, classes.url)}
                value={remote}
                onChange={changeHandler}
                fullWidth
            />
            <TextField
                name="rewrite"
                label="Rewrite"
                margin="normal"
                className={classNames(classes.field, classes.url)}
                value={rewrite}
                onChange={changeHandler}
                fullWidth
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={cancelHandler} color="secondary">
                Cancel
            </Button>
            <Button onClick={addHandler} disabled={!remote} color="primary">
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
            proxy: null,
            code: 200,
            bypass: false,
            delay: 0,
            headers: {},
            body: '',
            type: 'application/json',
            mode: 'json',
            validate: false
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
                    this.state.proxy ? (
                        <ProxyDetails
                            {...this.state.proxy}
                            classes={this.props.classes}
                            changeHandler={this.handleChange.bind(this)}
                            cancelHandler={this.handleCancel.bind(this)}
                            addHandler={this.handleAdd.bind(this)}
                        />
                    ) : (
                        <Details
                            {...this.state}
                            classes={this.props.classes}
                            template={this.props.template}
                            changeHandler={this.handleChange.bind(this)}
                            cancelHandler={this.handleCancel.bind(this)}
                            addHandler={this.handleAdd.bind(this)}
                        />
                    )
                ) : (
                    <Basic
                        {...this.state}
                        classes={this.props.classes}
                        template={this.props.template}
                        changeHandler={this.handleChange.bind(this)}
                        toggleProxyHandler={this.handleToggleProxy.bind(this)}
                        cancelHandler={this.handleCancel.bind(this)}
                        contineHandler={this.handleContinue.bind(this)}
                    />
                )}
            </Dialog>
        );
    }

    handleChange(e) {
        if (this.state.proxy && this.state.validate) {
            const { name, value } = e.target;
            this.setState(state => ({
                proxy: Object.assign({}, state.proxy, {
                    [name]: value
                })
            }));
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    handleToggleProxy(e) {
        this.setState({ proxy: e.target.checked ? {} : null });
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
        await this.props.createHandler(
            this.state.proxy
                ? {
                    method: this.state.method,
                    path: this.state.path,
                    bypass: this.state.bypass,
                    proxy: this.state.proxy
                }
                : {
                    method: this.state.method,
                    path: this.state.path,
                    bypass: this.state.bypass,
                    body: this.state.body,
                    code: this.state.code,
                    delay: this.state.delay,
                    headers: Object.assign({}, this.state.headers, {
                        'Content-Type': this.state.type
                    })
                }
        );
        this.setState({ validate: false });
        this.props.closeHandler();
    }

}

export default withStyles(styles)(AddRoute);
