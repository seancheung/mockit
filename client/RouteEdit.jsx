import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = {};

class EditRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = { code: props.code, body: props.body };
    }

    render() {
        return (
            <React.Fragment>
                <TextField
                    id="code"
                    label="Status Code"
                    value={this.state.code}
                    onChange={this.handleChange.bind(this)}
                    type="number"
                    margin="normal"
                />
                <TextField
                    id="body"
                    label="Body"
                    value={this.state.body}
                    onChange={this.handleChange.bind(this)}
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

}

export default withStyles(styles)(EditRoute);
