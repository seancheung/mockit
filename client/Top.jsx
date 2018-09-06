import React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import UploadIcon from '@material-ui/icons/FileUpload';
import DownloadIcon from '@material-ui/icons/FileDownload';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/cyan';
import { withStyles } from '@material-ui/core/styles';
import dispatcher from './store/dispatcher';
import RouteCreate from './RouteCreate';

const styles = {
    flex: {
        flexGrow: 1
    },
    button: {
        margin: '0 4px'
    }
};

class Top extends React.Component {

    constructor(props) {
        super(props);
        this.state = { create: false };
    }

    render() {
        return (
            <div>
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
                            color="primary"
                            aria-label="Add"
                            style={{ backgroundColor: grey['500'] }}
                            onClick={() => this.setState({ create: true })}
                        >
                            <AddIcon />
                        </Button>
                        <Button
                            className={this.props.classes.button}
                            variant="fab"
                            mini
                            color="primary"
                            aria-label="Import"
                            style={{ backgroundColor: green['500'] }}
                        >
                            <UploadIcon />
                        </Button>
                        <Button
                            className={this.props.classes.button}
                            variant="fab"
                            mini
                            color="primary"
                            aria-label="Export"
                            style={{ backgroundColor: purple['500'] }}
                        >
                            <DownloadIcon />
                        </Button>
                    </Toolbar>
                </AppBar>
                {this.props.template ? (
                    <RouteCreate
                        open={this.state.create}
                        template={this.props.template}
                        closeHandler={() => this.setState({ create: false })}
                        completeHandler={() => this.setState({ create: false })}
                    />
                ) : null}
            </div>
        );
    }

}

export default connect(
    state => ({ template: state.app.template }),
    dispatcher
)(withStyles(styles)(Top));
