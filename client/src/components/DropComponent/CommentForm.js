import React, {Component, PropTypes} from 'react'
import { reduxForm, Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton';
import * as Icons from '../../utils/Icons';

const handler = (reset, socketHandler, user, location, drop) => values =>
{
	socketHandler.comment({dropId: drop.dropId, userId: user.userId, text: values.title, date: moment()});
	reset();
}

const validate = values => {
	const errors = {};
	const requiredFields = [ 'title' ];
	requiredFields.forEach(field => {
		if (!values[ field ]) {
			errors[ field ] = 'Required'
		}
	});
	return errors;
}

const handleKeyPress = (submitHandler) => (event) => {
  if (event.key == "Enter" && !(event.shiftKey || event.ctrlKey || event.altKey))
    submitHandler();
};

export class CommentForm extends Component{

	render() {
		const { handleSubmit, pristine, reset, submitting, location, user, drop, socketHandler } = this.props;
    const submitHandler = handleSubmit(handler(reset, socketHandler, user, location, drop))
		return(
		<form onSubmit={ submitHandler }>
			<div className="row center-xs middle-xs">

  			<div className="col-xs-8">
    			<Field name="title" component={TextField} fullWidth={true}
            floatingLabelText="Write Message" floatingLabelStyle={{left: 0}}
      			errorStyle={{textAlign: "left"}} rows={2}
            onKeyPress={ handleKeyPress(submitHandler) } />
  			</div>

  			<div className="col-xs-2">
          <IconButton type="submit" iconStyle={{color: "#00bcd4"}} disabled={pristine || submitting}>{Icons.MUI('send')}</IconButton>
  			</div>
			</div>
		</form>
		)
	}
}

CommentForm = reduxForm({
	form: 'commentForm',
	validate
})(CommentForm)

CommentForm.propTypes = {
	socketHandler: PropTypes.object.isRequired,
	location: PropTypes.array.isRequired,
	drop: PropTypes.object.isRequired
};
