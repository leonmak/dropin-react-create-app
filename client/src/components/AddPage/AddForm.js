import React, {Component} from 'react'
import { reduxForm, Field } from 'redux-form'

import { TextField } from 'redux-form-material-ui'
import FlatButton from 'material-ui/FlatButton'
import EmojiInput from './EmojiInput'

const handler = reset => values =>
  new Promise(resolve => {
    setTimeout(() => {  // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      resolve()
      reset();
    }, 500)
  })

const validate = values => {
  const errors = {}
  const requiredFields = [ 'message' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  return errors
}


class AddForm extends Component {

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <form onSubmit={ handleSubmit(handler(reset)) }>
        <h1>Drop a new message</h1>
        <Field name="emoji" component={TextField} hintText="Choose emoji"/>

        <div className="row">
        <div className="col-xs-12">
        <Field name="message" component={TextField} hintText=""
          floatingLabelText="Drop a message" floatingLabelStyle={{left: 0}}
          errorStyle={{marginLeft: "-80%"}}
          multiLine={true} rows={2}/>
        </div>
        </div>

        <div className="row center-xs">
        <div className="col-xs-12">
        <FlatButton type="submit" label="Submit" disabled={pristine || submitting} />
        <FlatButton onTouchTap={reset} label="Clear" disabled={pristine || submitting} />
        </div>
        </div>

        <EmojiInput />

      </form>
    )
  }
}

// Decorate with redux-form
AddForm = reduxForm({
  form: 'addForm',
  validate
})(AddForm)

export default AddForm;
