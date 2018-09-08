import React from 'react';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    details: {
        display: 'block'
    },
    button: {
        margin: '0 4px'
    },
    menu: {
        witdh: 200
    },
    field: {
        display: 'block'
    }
};

const transition = {
    enter: 400,
    exit: 200
};

export const View = ({
    classes,
    code,
    body,
    expanded,
    transition,
    editHandler,
    deleteHandler
}) => (
    <React.Fragment>
        <ExpansionPanelDetails className={classes.details}>
            <TextField
                className={classes.field}
                label="Status Code"
                defaultValue={code}
                margin="normal"
                InputProps={{
                    readOnly: true
                }}
            />
            <TextField
                className={classes.field}
                label="Body"
                defaultValue={body}
                margin="normal"
                multiline
                InputProps={{
                    readOnly: true
                }}
            />
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
            <Zoom in={expanded} unmountOnExit timeout={transition}>
                <Button
                    className={classes.button}
                    variant="fab"
                    mini
                    color="primary"
                    aria-label="Edit"
                    onClick={editHandler.bind(null, true)}
                >
                    <EditIcon />
                </Button>
            </Zoom>
            <Zoom in={expanded} unmountOnExit timeout={transition}>
                <Button
                    className={classes.button}
                    variant="fab"
                    mini
                    color="secondary"
                    aria-label="Delete"
                    onClick={deleteHandler}
                >
                    <DeleteIcon />
                </Button>
            </Zoom>
        </ExpansionPanelActions>
    </React.Fragment>
);

export const Edit = ({
    classes,
    template,
    code,
    body,
    expanded,
    transition,
    changeHandler,
    updateHandler,
    cancelHandler
}) => (
    <React.Fragment>
        <ExpansionPanelDetails className={classes.details}>
            <TextField
                name="code"
                select
                label="Status Code"
                margin="normal"
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
                name="body"
                label="Body"
                multiline
                margin="normal"
                className={classes.field}
                value={body}
                onChange={changeHandler}
            />
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
            <Zoom in={expanded} unmountOnExit timeout={transition}>
                <Button
                    className={classes.button}
                    variant="fab"
                    mini
                    color="primary"
                    aria-label="Complete"
                    onClick={updateHandler}
                >
                    <CheckIcon />
                </Button>
            </Zoom>
            <Zoom in={expanded} unmountOnExit timeout={transition}>
                <Button
                    className={classes.button}
                    variant="fab"
                    mini
                    color="secondary"
                    aria-label="Cancel"
                    onClick={cancelHandler.bind(null, false)}
                >
                    <CancelIcon />
                </Button>
            </Zoom>
        </ExpansionPanelActions>
    </React.Fragment>
);

export class Route extends React.Component {

    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props.data, {
            expanded: false,
            edit: false
        });
    }

    render() {
        return (
            <ExpansionPanel
                onChange={(e, expanded) => this.setState({ expanded })}
            >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subheading">{`${this.props.data.method.toUpperCase()} ${
                        this.props.data.path
                    }`}</Typography>
                </ExpansionPanelSummary>
                {this.state.edit ? (
                    <Edit
                        classes={this.props.classes}
                        template={this.props.template}
                        {...this.state}
                        expanded={this.state.expanded}
                        transition={transition}
                        changeHandler={this.handleChange.bind(this)}
                        updateHandler={this.handleUpdate.bind(this)}
                        cancelHandler={() => this.setState({ edit: false })}
                    />
                ) : (
                    <View
                        classes={this.props.classes}
                        {...this.state}
                        expanded={this.state.expanded}
                        transition={transition}
                        deleteHandler={this.handleDelete.bind(this)}
                        editHandler={() => this.setState({ edit: true })}
                    />
                )}
            </ExpansionPanel>
        );
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async handleUpdate() {
        await this.props.updateHandler(this.state);
        this.setState({ edit: false });
    }

    handleDelete() {
        this.props.deleteHandler();
    }

}

export default withStyles(styles)(Route);
