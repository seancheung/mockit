import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    menu: {
        witdh: 200
    },
    field: {
        display: 'block'
    }
};

class EditRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = { code: props.code, body: props.body };
    }

    render() {
        return (
            <React.Fragment>
                <TextField
                    name="code"
                    select
                    label="Status Code"
                    margin="normal"
                    className={this.props.classes.field}
                    SelectProps={{
                        MenuProps: {
                            className: this.props.classes.menu
                        }
                    }}
                    value={this.state.code}
                    onChange={this.handleChange.bind(this)}
                >
                    {Object.entries(this.props.template.codes).map(([k, v]) => (
                        <MenuItem key={k} value={parseInt(k)}>
                            {k} {v}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    name="body"
                    label="Body"
                    multiline
                    margin="normal"
                    className={this.props.classes.field}
                    value={this.state.body}
                    onChange={this.handleChange.bind(this)}
                />
            </React.Fragment>
        );
    }

    handleChange(e) {
        let value = e.target.value;
        if (typeof this.state[e.target.name] === 'number') {
            value = Number(value);
        }
        const changed = { [e.target.name]: value };
        this.setState(changed);
        this.props.stateChangedHandler(changed);
    }

}

export default withStyles(styles)(EditRoute);
