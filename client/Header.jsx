import React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import UploadIcon from '@material-ui/icons/Publish';
import DownloadIcon from '@material-ui/icons/GetApp';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import cyan from '@material-ui/core/colors/cyan';
import grey from '@material-ui/core/colors/grey';
import withStyles from '@material-ui/core/styles/withStyles';
import director from './store/director';
import { MODES } from './store/consts';

const styles = {
    flex: {
        flexGrow: 1
    },
    button: {
        margin: '0 4px',
        padding: '6px'
    }
};

export const Header = ({ app, classes, getRoutes, setMode }) => (
    <AppBar position="absolute" color="primary">
        <Toolbar>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.flex}
            >
                Mockit!
            </Typography>
            <IconButton
                className={classes.button}
                variant="contained"
                aria-label="Refresh"
                size="small"
                style={{ backgroundColor: grey['500'] }}
                onClick={getRoutes.bind(null, app.index, app.size)}
            >
                <RefreshIcon />
            </IconButton>
            <IconButton
                className={classes.button}
                variant="contained"
                aria-label="Add"
                size="small"
                style={{ backgroundColor: cyan['500'] }}
                onClick={setMode.bind(null, MODES.ADD)}
            >
                <AddIcon />
            </IconButton>
            <IconButton
                className={classes.button}
                variant="contained"
                aria-label="Import"
                size="small"
                style={{ backgroundColor: green['500'] }}
                onClick={setMode.bind(null, MODES.IMPORT)}
            >
                <UploadIcon />
            </IconButton>
            <IconButton
                className={classes.button}
                variant="contained"
                aria-label="Export"
                size="small"
                style={{ backgroundColor: purple['500'] }}
                onClick={setMode.bind(null, MODES.EXPORT)}
            >
                <DownloadIcon />
            </IconButton>
        </Toolbar>
    </AppBar>
);

export default withStyles(styles)(
    connect(
        state => ({ app: state.app }),
        director
    )(Header)
);
