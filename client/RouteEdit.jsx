import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {};

class EditRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = { code: props.code, body: props.body };
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <React.Fragment>
                <TextField
                    id="code"
                    label="Status Code"
                    value={this.state.code}
                    onChange={this.handleChange}
                    type="number"
                    margin="normal"
                />
                <TextField
                    id="body"
                    label="Body"
                    value={this.state.body}
                    onChange={this.handleChange}
                    multiline
                    margin="normal"
                />
            </React.Fragment>
        );
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
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

export default withStyles(styles)(EditRoute);
