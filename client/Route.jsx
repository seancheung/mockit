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
        this.state = { edit: false };
        this.beginEdit = this.beginEdit.bind(this);
        this.endEdit = this.endEdit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.remove = this.remove.bind(this);
    }

    render() {
        return (
            <ExpansionPanel className={this.props.classes.root}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="button">{this.props.name}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={this.props.classes.details}>
                    {this.state.edit ? (
                        <RouteEdit {...this.getProps()} />
                    ) : (
                        <RouteView {...this.getProps()} />
                    )}
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                    {this.state.edit ? (
                        <React.Fragment>
                            <Button
                                size="small"
                                color="primary"
                                onClick={this.endEdit}
                            >
                                Complete
                            </Button>
                            <Button
                                size="small"
                                color="primary"
                                onClick={this.cancelEdit}
                            >
                                Cancel
                            </Button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Button
                                size="small"
                                color="primary"
                                onClick={this.beginEdit}
                            >
                                Edit
                            </Button>
                            <Button
                                size="small"
                                color="secondary"
                                onClick={this.remove}
                            >
                                Delete
                            </Button>
                        </React.Fragment>
                    )}
                </ExpansionPanelActions>
            </ExpansionPanel>
        );
    }

    getProps() {
        return {
            name: this.props.name,
            code: this.props.code,
            headers: this.props.headers,
            body: this.props.body,
            delay: this.props.delay
        };
    }

    beginEdit() {
        this.setState({ edit: true });
    }

    endEdit() {}

    cancelEdit() {
        this.setState({ edit: false });
    }

    remove() {}

    static get propTypes() {
        return {
            name: PropTypes.string.isRequired,
            code: PropTypes.number,
            headers: PropTypes.object,
            body: PropTypes.string,
            delay: PropTypes.number,
            classes: PropTypes.object
        };
    }

}

export default withStyles(styles)(Route);
