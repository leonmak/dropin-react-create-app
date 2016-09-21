import React from 'react';
import TextField from 'material-ui/TextField';

const UsernameTextField = (props) => {
    const { input: { value, onChange }, user } = props;
    const handler = e => onChange(e.target.value)

    return <TextField
        value={value.length>1 ? value : user.displayName}
        floatingLabelText="Display name"
        fullWidth={true}
        errorStyle={{textAlign: "left"}}
        onChange={ handler } />
}

export default UsernameTextField
