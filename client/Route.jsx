import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import RouteView from './RouteView';
import RouteEdit from './RouteEdit';

const styles = {
    root: {},
    details: {
        display: 'block'
    }
};

class Route extends React.Component {

    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props.data);
    }

    render() {
        return (
            <ExpansionPanel className={this.props.classes.root}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="button">{`${this.props.data.method.toUpperCase()} ${
                        this.props.data.path
                    }`}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={this.props.classes.details}>
                    {this.props.data.edit ? (
                        <RouteEdit
                            {...this.props.data}
                            stateChangedHandler={this.onEdit.bind(this)}
                        />
                    ) : (
                        <RouteView {...this.props.data} />
                    )}
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                    {this.props.data.edit ? (
                        <React.Fragment>
                            <Button
                                size="small"
                                color="primary"
                                onClick={this.update.bind(this)}
                            >
                                Complete
                            </Button>
                            <Button
                                size="small"
                                color="primary"
                                onClick={this.props.editHandler.bind(
                                    null,
                                    false
                                )}
                            >
                                Cancel
                            </Button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Button
                                size="small"
                                color="primary"
                                onClick={this.props.editHandler.bind(
                                    null,
                                    true
                                )}
                            >
                                Edit
                            </Button>
                            <Button
                                size="small"
                                color="secondary"
                                onClick={this.props.removeHandler}
                            >
                                Delete
                            </Button>
                        </React.Fragment>
                    )}
                </ExpansionPanelActions>
            </ExpansionPanel>
        );
    }

    onEdit(changed) {
        this.setState(changed);
    }

    update() {
        this.props.updateHandler(this.state);
    }

    static get propTypes() {
        return {
            classes: PropTypes.object,
            data: PropTypes.object,
            removeHandler: PropTypes.func,
            editHandler: PropTypes.func,
            updateHandler: PropTypes.func
        };
    }

}

export default withStyles(styles)(Route);
