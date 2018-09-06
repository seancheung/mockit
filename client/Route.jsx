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
        this.state = { edit: false, data: this.props.data };
    }

    render() {
        return (
            <ExpansionPanel className={this.props.classes.root}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="button">{`${this.state.data.method.toUpperCase()} ${
                        this.state.data.path
                    }`}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={this.props.classes.details}>
                    {this.state.edit ? (
                        <RouteEdit
                            {...this.state.data}
                            stateChangedHandler={this.onEdit.bind(this)}
                        />
                    ) : (
                        <RouteView {...this.state.data} />
                    )}
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                    {this.state.edit ? (
                        <React.Fragment>
                            <Button
                                size="small"
                                color="primary"
                                onClick={this.endEdit.bind(this)}
                            >
                                Complete
                            </Button>
                            <Button
                                size="small"
                                color="primary"
                                onClick={this.cancelEdit.bind(this)}
                            >
                                Cancel
                            </Button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Button
                                size="small"
                                color="primary"
                                onClick={this.beginEdit.bind(this)}
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

    beginEdit() {
        this.setState({ edit: true });
    }

    onEdit(changed) {
        this.setState({ data: Object.assign({}, this.state.data, changed) });
    }

    endEdit() {
        this.props
            .updateHandler(this.state.data)
            .then(() => this.setState({ edit: false }));
    }

    cancelEdit() {
        this.setState({ edit: false });
    }

    static get propTypes() {
        return {
            classes: PropTypes.object,
            data: PropTypes.object,
            removeHandler: PropTypes.func,
            updateHandler: PropTypes.func
        };
    }

}

export default withStyles(styles)(Route);
