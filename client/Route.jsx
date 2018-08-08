import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {
    root: {}
};

class Route extends React.Component {

    render() {
        return (
            <ExpansionPanel className={this.props.classes.root}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="button">{this.props.name}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>{this.props.body}</Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }

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
