import React from 'react';
import List from '@material-ui/core/List';
import Zoom from '@material-ui/core/Zoom';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import CheckIcon from '@material-ui/icons/Check';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import PublicIcon from '@material-ui/icons/Public';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionPanel from '@material-ui/core/Accordion';
import AccordionPanelSummary from '@material-ui/core/AccordionSummary';
import AccordionPanelDetails from '@material-ui/core/AccordionDetails';
import AccordionPanelActions from '@material-ui/core/AccordionActions';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import grey from '@material-ui/core/colors/grey';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import AceEditor from 'react-ace';
import { typeToMode } from './store/utils';

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
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5)
    },
    bodyEditor: {
        marginLeft: theme.spacing(10)
    },
    listNested: {
        paddingLeft: theme.spacing(10)
    },
    spacing: {
        marginBottom: theme.spacing(4)
    },
    url: {
        width: '90%'
    },
    flex: {
        flex: 1
    },
    badge: {
        backgroundColor: grey['500'],
        width: '12px',
        height: '12px',
        top: '-3px',
        right: '0px'
    },
    label: {
        padding: `0 ${theme.spacing(2)}px`
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
        <AccordionPanelDetails className={classes.details}>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>C</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Status Code" secondary={code} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>D</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Delay(ms)" secondary={delay} />
                </ListItem>
                <ListItem
                    disabled={!headers}
                    button
                    onClick={toggleHeadersHandler}
                >
                    <ListItemAvatar>
                        <Avatar>H</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Headers" />
                    {headersExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Collapse in={headersExpanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {headers &&
                            Object.entries(headers).map(([k, v]) => (
                                <ListItem
                                    key={k}
                                    className={classes.listNested}
                                >
                                    <ListItemText primary={k} secondary={v} />
                                </ListItem>
                            ))}
                    </List>
                </Collapse>
                <ListItem disabled={!body} button onClick={toggleBodyHandler}>
                    <ListItemAvatar>
                        <Avatar>B</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Body" />
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
        </AccordionPanelDetails>
        <Divider />
        <AccordionPanelActions>
            <Zoom in={expanded} unmountOnExit timeout={transition}>
                <IconButton
                    className={classes.button}
                    variant="contained"
                    size="small"
                    color="primary"
                    aria-label="Edit"
                    onClick={editHandler.bind(null, true)}
                >
                    <EditIcon />
                </IconButton>
            </Zoom>
            <Zoom in={expanded} unmountOnExit timeout={transition}>
                <IconButton
                    className={classes.button}
                    variant="contained"
                    size="small"
                    color="secondary"
                    aria-label="Delete"
                    onClick={deleteHandler}
                >
                    <DeleteIcon />
                </IconButton>
            </Zoom>
        </AccordionPanelActions>
    </React.Fragment>
);

export const Edit = ({
    classes,
    template,
    code,
    delay = '',
    body = '',
    headers = {},
    expanded,
    transition,
    changeHandler,
    updateHandler,
    cancelHandler,
    newHeader,
    newHeaderChangeHandler,
    addHeaderHandler,
    headerChangeHandler,
    deleteHeaderHandler
}) => (
    <React.Fragment>
        <AccordionPanelDetails className={classes.details}>
            <TextField
                select
                label="Status Code"
                margin="normal"
                className={classNames(classes.field, classes.spacing)}
                SelectProps={{
                    MenuProps: {
                        className: classes.menu
                    }
                }}
                value={code}
                onChange={e => changeHandler('code', e.target.value)}
            >
                {Object.entries(template.codes).map(([k, v]) => (
                    <MenuItem key={k} value={parseInt(k)}>
                        {k} {v}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label="Delay(ms)"
                margin="normal"
                type="number"
                className={classNames(classes.field, classes.spacing)}
                value={delay}
                onChange={e => changeHandler('delay', e.target.value)}
            />
            <Typography variant="caption" gutterBottom>
                Body
            </Typography>
            <AceEditor
                mode={typeToMode(headers['Content-Type'])}
                theme="github"
                className={classes.spacing}
                showPrintMargin={false}
                onChange={value => changeHandler('body', value)}
                editorProps={{ $blockScrolling: true }}
                value={body}
                height="300px"
                width="80%"
            />
            <Typography variant="caption" gutterBottom>
                Headers
            </Typography>
            <List disablePadding className={classes.spacing}>
                <ListItem key={'__new'}>
                    <TextField
                        label="Key"
                        value={newHeader.key}
                        onChange={e =>
                            newHeaderChangeHandler('key', e.target.value)
                        }
                    />
                    <TextField
                        label="Value"
                        value={newHeader.value}
                        onChange={e =>
                            newHeaderChangeHandler('value', e.target.value)
                        }
                    />
                    <ListItemSecondaryAction>
                        <IconButton
                            aria-label="Add"
                            onClick={addHeaderHandler}
                            disabled={
                                !newHeader.key ||
                                !newHeader.value ||
                                headers[newHeader.key] != null
                            }
                        >
                            <AddIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                {Object.entries(headers).map(([k, v]) => (
                    <ListItem key={k}>
                        <TextField
                            label={k}
                            value={v}
                            onChange={e =>
                                headerChangeHandler(k, e.target.value)
                            }
                        />
                        <ListItemSecondaryAction>
                            <IconButton
                                aria-label="Delete"
                                onClick={deleteHeaderHandler.bind(null, k)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </AccordionPanelDetails>
        <Divider />
        <AccordionPanelActions>
            <Zoom in={expanded} unmountOnExit timeout={transition}>
                <IconButton
                    className={classes.button}
                    variant="contained"
                    size="small"
                    color="primary"
                    aria-label="Complete"
                    onClick={updateHandler}
                >
                    <CheckIcon />
                </IconButton>
            </Zoom>
            <Zoom in={expanded} unmountOnExit timeout={transition}>
                <IconButton
                    className={classes.button}
                    variant="contained"
                    size="small"
                    color="secondary"
                    aria-label="Cancel"
                    onClick={cancelHandler.bind(null, false)}
                >
                    <CancelIcon />
                </IconButton>
            </Zoom>
        </AccordionPanelActions>
    </React.Fragment>
);

export const ProxyView = ({
    classes,
    remote,
    rewrite,
    headers,
    expanded,
    transition,
    editHandler,
    deleteHandler,
    headersExpanded,
    toggleHeadersHandler
}) => (
    <React.Fragment>
        <AccordionPanelDetails className={classes.details}>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>R</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Remote" secondary={remote} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>W</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Rewrite" secondary={rewrite} />
                </ListItem>
                <ListItem
                    disabled={!headers}
                    button
                    onClick={toggleHeadersHandler}
                >
                    <ListItemAvatar>
                        <Avatar>H</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Headers" />
                    {headersExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Collapse in={headersExpanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {headers &&
                            Object.entries(headers).map(([k, v]) => (
                                <ListItem
                                    key={k}
                                    className={classes.listNested}
                                >
                                    <ListItemText primary={k} secondary={v} />
                                </ListItem>
                            ))}
                    </List>
                </Collapse>
            </List>
        </AccordionPanelDetails>
        <Divider />
        <AccordionPanelActions>
            <Zoom in={expanded} unmountOnExit timeout={transition}>
                <IconButton
                    className={classes.button}
                    variant="contained"
                    size="small"
                    color="primary"
                    aria-label="Edit"
                    onClick={editHandler.bind(null, true)}
                >
                    <EditIcon />
                </IconButton>
            </Zoom>
            <Zoom in={expanded} unmountOnExit timeout={transition}>
                <IconButton
                    className={classes.button}
                    variant="contained"
                    size="small"
                    color="secondary"
                    aria-label="Delete"
                    onClick={deleteHandler}
                >
                    <DeleteIcon />
                </IconButton>
            </Zoom>
        </AccordionPanelActions>
    </React.Fragment>
);

export const ProxyEdit = ({
    classes,
    remote = '',
    rewrite = '',
    headers = {},
    expanded,
    transition,
    changeHandler,
    updateHandler,
    cancelHandler,
    newHeader,
    newHeaderChangeHandler,
    addHeaderHandler,
    headerChangeHandler,
    deleteHeaderHandler
}) => (
    <React.Fragment>
        <AccordionPanelDetails className={classes.details}>
            <TextField
                label="Remote"
                margin="normal"
                className={classNames(
                    classes.field,
                    classes.spacing,
                    classes.url
                )}
                value={remote}
                onChange={e => changeHandler('remote', e.target.value)}
                fullWidth
            />
            <TextField
                label="Rewrite"
                margin="normal"
                className={classNames(
                    classes.field,
                    classes.spacing,
                    classes.url
                )}
                value={rewrite}
                onChange={e => changeHandler('rewrite', e.target.value)}
                fullWidth
            />
            <Typography
                variant="caption"
                gutterBottom
                className={classes.label}
            >
                Headers
            </Typography>
            <List disablePadding className={classes.spacing}>
                <ListItem key="__new">
                    <TextField
                        label="Key"
                        value={newHeader.key}
                        onChange={e =>
                            newHeaderChangeHandler('key', e.target.value)
                        }
                    />
                    <TextField
                        label="Value"
                        value={newHeader.value}
                        onChange={e =>
                            newHeaderChangeHandler('value', e.target.value)
                        }
                    />
                    <ListItemSecondaryAction>
                        <IconButton
                            aria-label="Add"
                            onClick={addHeaderHandler}
                            disabled={
                                !newHeader.key ||
                                !newHeader.value ||
                                headers[newHeader.key] != null
                            }
                        >
                            <AddIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                {Object.entries(headers).map(([k, v]) => (
                    <ListItem key={k}>
                        <TextField
                            label={k}
                            value={v}
                            onChange={e =>
                                headerChangeHandler(k, e.target.value)
                            }
                        />
                        <ListItemSecondaryAction>
                            <IconButton
                                aria-label="Delete"
                                onClick={deleteHeaderHandler.bind(null, k)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </AccordionPanelDetails>
        <Divider />
        <AccordionPanelActions>
            <Zoom in={expanded} unmountOnExit timeout={transition}>
                <IconButton
                    className={classes.button}
                    variant="contained"
                    size="small"
                    color="primary"
                    aria-label="Complete"
                    onClick={updateHandler}
                >
                    <CheckIcon />
                </IconButton>
            </Zoom>
            <Zoom in={expanded} unmountOnExit timeout={transition}>
                <IconButton
                    className={classes.button}
                    variant="contained"
                    size="small"
                    color="secondary"
                    aria-label="Cancel"
                    onClick={cancelHandler.bind(null, false)}
                >
                    <CancelIcon />
                </IconButton>
            </Zoom>
        </AccordionPanelActions>
    </React.Fragment>
);

export class Route extends React.Component {

    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props.data, {
            expanded: false,
            edit: false,
            headersExpanded: false,
            bodyExpanded: false,
            newHeader: { key: '', value: '' },
            dirty: new Set()
        });
    }

    render() {
        return (
            <AccordionPanel
                onChange={(e, expanded) => this.setState({ expanded })}
            >
                <AccordionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography
                        variant="subtitle1"
                        className={this.props.classes.flex}
                    >{`${this.props.data.method.toUpperCase()} ${
                            this.props.data.path
                        }`}</Typography>
                    {this.state.proxy ? <PublicIcon color="primary" /> : null}
                </AccordionPanelSummary>
                {this.state.edit ? (
                    this.state.proxy ? (
                        <ProxyEdit
                            classes={this.props.classes}
                            {...this.state.proxy}
                            expanded={this.state.expanded}
                            transition={transition}
                            newHeader={this.state.newHeader}
                            changeHandler={this.handleChange.bind(this)}
                            updateHandler={this.handleUpdate.bind(this)}
                            cancelHandler={this.handleCancel.bind(this)}
                            newHeaderChangeHandler={this.handleNewHeaderChange.bind(
                                this
                            )}
                            addHeaderHandler={this.handleAddNewHeader.bind(
                                this
                            )}
                            headerChangeHandler={this.handleHeaderChange.bind(
                                this
                            )}
                            deleteHeaderHandler={this.handleDeleteHeader.bind(
                                this
                            )}
                        />
                    ) : (
                        <Edit
                            classes={this.props.classes}
                            template={this.props.template}
                            {...this.state}
                            expanded={this.state.expanded}
                            transition={transition}
                            newHeader={this.state.newHeader}
                            changeHandler={this.handleChange.bind(this)}
                            updateHandler={this.handleUpdate.bind(this)}
                            cancelHandler={this.handleCancel.bind(this)}
                            newHeaderChangeHandler={this.handleNewHeaderChange.bind(
                                this
                            )}
                            addHeaderHandler={this.handleAddNewHeader.bind(
                                this
                            )}
                            headerChangeHandler={this.handleHeaderChange.bind(
                                this
                            )}
                            deleteHeaderHandler={this.handleDeleteHeader.bind(
                                this
                            )}
                        />
                    )
                ) : this.state.proxy ? (
                    <ProxyView
                        classes={this.props.classes}
                        {...this.state.proxy}
                        expanded={this.state.expanded}
                        transition={transition}
                        headersExpanded={this.state.headersExpanded}
                        deleteHandler={this.handleDelete.bind(this)}
                        editHandler={this.handleEdit.bind(this)}
                        toggleHeadersHandler={this.handleToggleHeaders.bind(
                            this
                        )}
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
            </AccordionPanel>
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

    handleChange(key, value) {
        this.setState(
            state =>
                state.proxy
                    ? {
                        proxy: Object.assign({}, state.proxy, {
                            [key]: value
                        }),
                        dirty: new Set(state.dirty).add('proxy')
                    }
                    : {
                        [key]: value,
                        dirty: new Set(state.dirty).add(key)
                    }
        );
    }

    handleCancel() {
        this.setState(Object.assign({}, this.props.data, { edit: false }));
    }

    async handleUpdate() {
        await this.props.updateHandler(
            this.state,
            Array.from(this.state.dirty)
        );
        this.setState({ edit: false });
    }

    handleDelete() {
        this.props.deleteHandler();
    }

    handleHeaderChange(key, value) {
        this.setState(
            state =>
                state.proxy
                    ? {
                        proxy: Object.assign({}, state.proxy, {
                            headers: Object.assign({}, state.proxy.headers, {
                                [key]: value
                            })
                        }),
                        dirty: new Set(state.dirty).add('proxy')
                    }
                    : {
                        headers: Object.assign({}, state.headers, {
                            [key]: value
                        }),
                        dirty: new Set(state.dirty).add('headers')
                    }
        );
    }

    handleDeleteHeader(key) {
        this.setState(
            state =>
                state.proxy
                    ? {
                        proxy: Object.assign({}, state.proxy, {
                            headers: Object.entries(
                                state.proxy.headers
                            ).reduce(
                                (t, [k, v]) =>
                                    key === k
                                        ? t
                                        : Object.assign(t, { [k]: v }),
                                {}
                            )
                        }),
                        dirty: new Set(state.dirty).add('proxy')
                    }
                    : {
                        headers: Object.entries(state.headers).reduce(
                            (t, [k, v]) =>
                                key === k ? t : Object.assign(t, { [k]: v }),
                            {}
                        ),
                        dirty: new Set(state.dirty).add('headers')
                    }
        );
    }

    handleNewHeaderChange(key, value) {
        this.setState(state => ({
            newHeader: Object.assign({}, state.newHeader, {
                [key]: value
            })
        }));
    }

    handleAddNewHeader() {
        this.setState(
            state =>
                state.proxy
                    ? {
                        proxy: Object.assign({}, state.proxy, {
                            headers: Object.assign({}, state.proxy.headers, {
                                [state.newHeader.key]: state.newHeader.value
                            })
                        }),
                        newHeader: { key: '', value: '' },
                        dirty: new Set(state.dirty).add('proxy')
                    }
                    : {
                        headers: Object.assign({}, state.headers, {
                            [state.newHeader.key]: state.newHeader.value
                        }),
                        newHeader: { key: '', value: '' },
                        dirty: new Set(state.dirty).add('headers')
                    }
        );
    }

}

export default withStyles(styles)(Route);
