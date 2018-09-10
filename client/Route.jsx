import React from 'react';
import List from '@material-ui/core/List';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import CheckIcon from '@material-ui/icons/Check';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import { withStyles } from '@material-ui/core/styles';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/github';

const styles = theme => ({
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
    },
    listItem: {
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
        paddingTop: theme.spacing.unit * 1.5,
        paddingBottom: theme.spacing.unit * 1.5
    },
    bodyEditor: {
        marginLeft: theme.spacing.unit * 10
    },
    listNested: {
        paddingLeft: theme.spacing.unit * 10
    }
});

const transition = {
    enter: 400,
    exit: 200
};

export const View = ({
    classes,
    code,
    delay,
    body,
    headers,
    expanded,
    transition,
    editHandler,
    deleteHandler,
    headersExpanded,
    bodyExpanded,
    toggleBodyHandler,
    toggleHeadersHandler
}) => (
    <React.Fragment>
        <ExpansionPanelDetails className={classes.details}>
            <List>
                <ListItem>
                    <Avatar>C</Avatar>
                    <ListItemText primary="Status Code" secondary={code} />
                </ListItem>
                <ListItem>
                    <Avatar>D</Avatar>
                    <ListItemText primary="Delay(ms)" secondary={delay} />
                </ListItem>
                <ListItem button onClick={toggleHeadersHandler}>
                    <Avatar>H</Avatar>
                    <ListItemText inset primary="Headers" />
                    {headersExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Collapse in={headersExpanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {Object.entries(headers).map(([k, v]) => (
                            <ListItem key={k} className={classes.listNested}>
                                <ListItemText primary={k} secondary={v} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
                <ListItem button onClick={toggleBodyHandler}>
                    <Avatar>B</Avatar>
                    <ListItemText inset primary="Body" />
                    {bodyExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Collapse in={bodyExpanded} timeout="auto" unmountOnExit>
                    <AceEditor
                        className={classes.bodyEditor}
                        mode="json"
                        theme="github"
                        readOnly={true}
                        showGutter={false}
                        wrapEnabled={true}
                        showPrintMargin={false}
                        highlightActiveLine={false}
                        editorProps={{ $blockScrolling: true }}
                        value={body}
                        height="300px"
                        width="80%"
                    />
                </Collapse>
            </List>
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
    delay,
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
                name="delay"
                label="Delay(ms)"
                margin="normal"
                type="number"
                className={classes.field}
                value={delay}
                onChange={changeHandler}
            />
            <Typography variant="caption" gutterBottom>
                Body
            </Typography>
            <AceEditor
                mode="json"
                theme="github"
                showPrintMargin={false}
                onChange={value =>
                    changeHandler({ target: { name: 'body', value } })
                }
                editorProps={{ $blockScrolling: true }}
                value={body}
                height="300px"
                width="80%"
            />
            <Divider inset />
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
            edit: false,
            headersExpanded: false,
            bodyExpanded: false
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
                        cancelHandler={this.handleCancel.bind(this)}
                    />
                ) : (
                    <View
                        classes={this.props.classes}
                        {...this.state}
                        expanded={this.state.expanded}
                        transition={transition}
                        headersExpanded={this.state.headersExpanded}
                        bodyExpanded={this.state.bodyExpanded}
                        deleteHandler={this.handleDelete.bind(this)}
                        editHandler={this.handleEdit.bind(this)}
                        toggleHeadersHandler={this.handleToggleHeaders.bind(
                            this
                        )}
                        toggleBodyHandler={this.handleToggleBody.bind(this)}
                    />
                )}
            </ExpansionPanel>
        );
    }

    handleToggleHeaders() {
        this.setState(state => ({ headersExpanded: !state.headersExpanded }));
    }

    handleToggleBody() {
        this.setState(state => ({ bodyExpanded: !state.bodyExpanded }));
    }

    handleEdit() {
        this.setState({ edit: true });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleCancel() {
        this.setState(Object.assign({}, this.props.data, { edit: false }));
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
