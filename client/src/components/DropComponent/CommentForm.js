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


export class CommentForm extends Component{

	render() {
		const { handleSubmit, pristine, reset, submitting, location, user, drop } = this.props;
		return(
		<form onSubmit={ handleSubmit(handler(reset, this.props.socketHandler,
				this.props.user, this.props.location, this.props.drop)) }>
			<div className="row center-xs middle-xs">

  			<div className="col-xs-8">
    			<Field name="title" component={TextField} fullWidth={false}
            floatingLabelText="Write Message" floatingLabelStyle={{left: 0}}
      			errorStyle={{textAlign: "left"}} multiLine={true} rows={2}/>
  			</div>

  			<div className="col-xs-3">
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
