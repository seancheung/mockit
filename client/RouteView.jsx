import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const styles = {
    text: {
        display: 'block'
    }
};

class RouteView extends React.Component {

    render() {
        return (
            <React.Fragment>
                <TextField
                    className={this.props.classes.text}
                    label="Status Code"
                    defaultValue={this.props.code}
                    margin="normal"
                    InputProps={{
                        readOnly: true
                    }}
                />
                <TextField
                    className={this.props.classes.text}
                    label="Body"
                    defaultValue={this.props.body}
                    margin="normal"
                    multiline
                    InputProps={{
                        readOnly: true
                    }}
                />
            </React.Fragment>
        );
    }

    static get propTypes() {
        return {
            method: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
            code: PropTypes.number,
            headers: PropTypes.object,
            body: PropTypes.string,
            delay: PropTypes.number,
            classes: PropTypes.object
        };
    }

}

export default withStyles(styles)(RouteView);
