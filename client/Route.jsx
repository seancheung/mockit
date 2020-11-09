import React, { useState } from 'react';
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

export const ContentView = ({ classes, code, delay, body, headers }) => {
    const [headersExpanded, setHeadersExpanded] = useState(false);
    const [bodyExpanded, setBodyExpanded] = useState(false);
    const toggleHeadersHandler = () => setHeadersExpanded(!headersExpanded);
    const toggleBodyHandler = () => setBodyExpanded(!bodyExpanded);
    return (
        <React.Fragment>
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
            <ListItem disabled={!headers} button onClick={toggleHeadersHandler}>
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
                            <ListItem key={k} className={classes.listNested}>
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
        </React.Fragment>
    );
};

export const View = ({
    classes,
    code,
    delay,
    body,
    cond,
    headers,
    expanded,
    transition,
    editHandler,
    deleteHandler
}) => {
    return (
        <React.Fragment>
            <AccordionPanelDetails className={classes.details}>
                <List>
                    <ContentView
                        code={code}
                        delay={delay}
                        body={body}
                        headers={headers}
                        classes={classes}
                    />
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
};

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
    headerChangeHandler,
    deleteHeaderHandler
}) => {
    const [newHeader, setNewHeader] = useState({ key: '', value: '' });
    const addHeaderHandler = () => {
        headerChangeHandler(newHeader.key, newHeader.value);
        setNewHeader({ key: '', value: '' });
    };
    return (
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
                                setNewHeader({
                                    ...newHeader,
                                    key: e.target.value
                                })
                            }
                        />
                        <TextField
                            label="Value"
                            value={newHeader.value}
                            onChange={e =>
                                setNewHeader({
                                    ...newHeader,
                                    value: e.target.value
                                })
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
};

export const ProxyView = ({
    classes,
    remote,
    rewrite,
    headers,
    expanded,
    transition,
    editHandler,
    deleteHandler
}) => {
    const [headersExpanded, setHeadersExpanded] = useState(false);
    const toggleHeadersHandler = () => setHeadersExpanded(!headersExpanded);
    return (
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
                        {headersExpanded ? (
                            <ExpandLessIcon />
                        ) : (
                            <ExpandMoreIcon />
                        )}
                    </ListItem>
                    <Collapse in={headersExpanded} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {headers &&
                                Object.entries(headers).map(([k, v]) => (
                                    <ListItem
                                        key={k}
                                        className={classes.listNested}
                                    >
                                        <ListItemText
                                            primary={k}
                                            secondary={v}
                                        />
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
};

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
    headerChangeHandler,
    deleteHeaderHandler
}) => {
    const [newHeader, setNewHeader] = useState({ key: '', value: '' });
    const addHeaderHandler = () => {
        headerChangeHandler(newHeader.key, newHeader.value);
        setNewHeader({ key: '', value: '' });
    };
    return (
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
                                setNewHeader({
                                    ...newHeader,
                                    key: e.target.value
                                })
                            }
                        />
                        <TextField
                            label="Value"
                            value={newHeader.value}
                            onChange={e =>
                                setNewHeader({
                                    ...newHeader,
                                    key: e.target.value
                                })
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
};

export const Route = ({
    classes,
    data,
    template,
    updateHandler,
    deleteHandler
}) => {
    const [expanded, setExpanded] = useState(false);
    const [edit, setEdit] = useState(false);
    const [dirty, setDirty] = useState([]);
    const [state, setState] = useState(data);
    const isProxy = data.proxy;

    const handleChange = (key, value) => {
        if (isProxy) {
            setState({
                ...state,
                proxy: {
                    ...state.proxy,
                    [key]: value
                }
            });
            setDirty(new Set(dirty).add('proxy'));
        } else {
            setState({
                ...state,
                [key]: value
            });
            setDirty(new Set(dirty).add(key));
        }
    };

    const handleCancel = () => setEdit(false);
    const handleEdit = () => setEdit(true);

    const handleUpdate = async () => {
        await updateHandler(state, Array.from(dirty));
        setEdit(false);
    };

    const handleDelete = () => deleteHandler();

    const handleHeaderChange = (key, value) => {
        if (isProxy) {
            setState({
                ...state,
                proxy: {
                    ...state.proxy,
                    headers: {
                        ...state.proxy.headers,
                        [key]: value
                    }
                }
            });
            setDirty(new Set(dirty).add('proxy'));
        } else {
            setState({
                ...state,
                headers: {
                    ...state.headers,
                    [key]: value
                }
            });
            setDirty(new Set(dirty).add('headers'));
        }
    };

    const handleDeleteHeader = key => {
        if (isProxy) {
            setState({
                ...state,
                proxy: {
                    ...state.proxy,
                    headers: Object.entries(state.proxy.headers).reduce(
                        (t, [k, v]) =>
                            key === k ? t : Object.assign(t, { [k]: v }),
                        {}
                    )
                }
            });
            setDirty(new Set(dirty).add('proxy'));
        } else {
            setState({
                ...state,
                headers: Object.entries(state.headers).reduce(
                    (t, [k, v]) =>
                        key === k ? t : Object.assign(t, { [k]: v }),
                    {}
                )
            });
            setDirty(new Set(dirty).add('headers'));
        }
    };

    return (
        <AccordionPanel onChange={(e, expanded) => setExpanded(expanded)}>
            <AccordionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                    variant="subtitle1"
                    className={classes.flex}
                >{`${data.method.toUpperCase()} ${data.path}`}</Typography>
                {state.proxy ? <PublicIcon color="primary" /> : null}
            </AccordionPanelSummary>
            {edit ? (
                state.proxy ? (
                    <ProxyEdit
                        classes={classes}
                        {...state.proxy}
                        expanded={expanded}
                        transition={transition}
                        changeHandler={handleChange}
                        updateHandler={handleUpdate}
                        cancelHandler={handleCancel}
                        headerChangeHandler={handleHeaderChange}
                        deleteHeaderHandler={handleDeleteHeader}
                    />
                ) : (
                    <Edit
                        classes={classes}
                        template={template}
                        {...state}
                        expanded={expanded}
                        transition={transition}
                        changeHandler={handleChange}
                        updateHandler={handleUpdate}
                        cancelHandler={handleCancel}
                        headerChangeHandler={handleHeaderChange}
                        deleteHeaderHandler={handleDeleteHeader}
                    />
                )
            ) : state.proxy ? (
                <ProxyView
                    classes={classes}
                    {...state.proxy}
                    expanded={expanded}
                    transition={transition}
                    deleteHandler={handleDelete}
                    editHandler={handleEdit}
                />
            ) : (
                <View
                    classes={classes}
                    {...state}
                    expanded={expanded}
                    transition={transition}
                    deleteHandler={handleDelete}
                    editHandler={handleEdit}
                />
            )}
        </AccordionPanel>
    );
};

export default withStyles(styles)(Route);
