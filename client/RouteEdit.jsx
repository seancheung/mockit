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
        let value = e.target.value;
        if (typeof this.state[e.target.id] === 'number') {
            value = Number(value);
        }
        const changed = { [e.target.id]: value };
        this.setState(changed);
        this.props.stateChangedHandler(changed);
    }

    static get propTypes() {
        return {
            method: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
            code: PropTypes.number,
            headers: PropTypes.object,
            body: PropTypes.string,
            delay: PropTypes.number,
            classes: PropTypes.object,
            stateChangedHandler: PropTypes.func
        };
    }

}

export default withStyles(styles)(EditRoute);
