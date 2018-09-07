import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import UploadIcon from '@material-ui/icons/FileUpload';
import DownloadIcon from '@material-ui/icons/FileDownload';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import cyan from '@material-ui/core/colors/cyan';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    flex: {
        flexGrow: 1
    },
    button: {
        margin: '0 4px'
    }
};

export class Header extends React.Component {

    render() {
        return (
            <AppBar position="absolute" color="primary">
                <Toolbar>
                    <Typography
                        variant="title"
                        color="inherit"
                        className={this.props.classes.flex}
                    >
                        Mockit!
                    </Typography>
                    <Button
                        className={this.props.classes.button}
                        variant="fab"
                        mini
                        aria-label="Add"
                        style={{ backgroundColor: cyan['500'] }}
                    >
                        <AddIcon />
                    </Button>
                    <Button
                        className={this.props.classes.button}
                        variant="fab"
                        mini
                        aria-label="Import"
                        style={{ backgroundColor: green['500'] }}
                    >
                        <UploadIcon />
                    </Button>
                    <Button
                        className={this.props.classes.button}
                        variant="fab"
                        mini
                        aria-label="Export"
                        style={{ backgroundColor: purple['500'] }}
                    >
                        <DownloadIcon />
                    </Button>
                </Toolbar>
            </AppBar>
        );
    }

}

export default withStyles(styles)(Header);
