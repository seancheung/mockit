import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import RouteView from './RouteView';
import RouteEdit from './RouteEdit';

const styles = {
    details: {
        display: 'block'
    },
    button: {
        margin: '0 4px'
    }
};

const transition = {
    enter: 400,
    exit: 200
};

class Route extends React.Component {

    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props.data, { expanded: false });
    }

    render() {
        let view, menu;
        if (this.props.data.edit) {
            view = (
                <RouteEdit
                    {...this.props.data}
                    template={this.props.template}
                    stateChangedHandler={this.handleEdit.bind(this)}
                />
            );
        } else {
            view = <RouteView {...this.props.data} />;
        }
        if (this.props.data.edit) {
            menu = (
                <React.Fragment>
                    <Zoom
                        in={this.state.expanded}
                        unmountOnExit
                        timeout={transition}
                    >
                        <Button
                            className={this.props.classes.button}
                            variant="fab"
                            mini
                            color="primary"
                            aria-label="Complete"
                            onClick={this.handleUpdate.bind(this)}
                        >
                            <CheckIcon />
                        </Button>
                    </Zoom>
                    <Zoom
                        in={this.state.expanded}
                        unmountOnExit
                        timeout={transition}
                    >
                        <Button
                            className={this.props.classes.button}
                            variant="fab"
                            mini
                            color="secondary"
                            aria-label="Cancel"
                            onClick={this.props.editHandler.bind(null, false)}
                        >
                            <CancelIcon />
                        </Button>
                    </Zoom>
                </React.Fragment>
            );
        } else {
            menu = (
                <React.Fragment>
                    <Zoom
                        in={this.state.expanded}
                        unmountOnExit
                        timeout={transition}
                    >
                        <Button
                            className={this.props.classes.button}
                            variant="fab"
                            mini
                            color="primary"
                            aria-label="Edit"
                            onClick={this.props.editHandler.bind(null, true)}
                        >
                            <EditIcon />
                        </Button>
                    </Zoom>
                    <Zoom
                        in={this.state.expanded}
                        unmountOnExit
                        timeout={transition}
                    >
                        <Button
                            className={this.props.classes.button}
                            variant="fab"
                            mini
                            color="secondary"
                            aria-label="Delete"
                            onClick={this.props.removeHandler}
                        >
                            <DeleteIcon />
                        </Button>
                    </Zoom>
                </React.Fragment>
            );
        }

        return (
            <ExpansionPanel
                onChange={(e, expanded) => this.setState({ expanded })}
            >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subheading">{`${this.props.data.method.toUpperCase()} ${
                        this.props.data.path
                    }`}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={this.props.classes.details}>
                    {view}
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>{menu}</ExpansionPanelActions>
            </ExpansionPanel>
        );
    }

    handleEdit(changed) {
        this.setState(changed);
    }

    handleUpdate() {
        this.props.updateHandler(this.state);
    }

}

export default withStyles(styles)(Route);
