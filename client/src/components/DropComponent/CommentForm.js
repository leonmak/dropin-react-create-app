import React, {Component, PropTypes} from 'react'
import { reduxForm, Field } from 'redux-form'

import { TextField } from 'redux-form-material-ui'
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton'


const handler = (reset, socketHandler, user, location) => values =>
{
	console.log(values);
	window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
	console.log('user', user);
	console.log('location', location);

	/*socketHandler.post(
		{userID: user.userId,
			emoji: values.emojiUni,
			title: values.title,
			video: values.videoUrl,
			image: values.imageId,
			sound: values.soundcloudUrl,
			longitude: location[0],
			latitude: location[1],
			date: moment()});*/
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
				const { handleSubmit, pristine, reset, submitting } = this.props;
				return(
					<form onSubmit={ handleSubmit(handler(reset, this.props.socketHandler,
						this.props.user, this.props.location)) }>
					<div className="row center-xs">

					<div className="col-xs-8">
					<Field name="title" component={TextField} fullWidth={false}
					floatingLabelText="Write Message" floatingLabelStyle={{left: 0}}
					errorStyle={{textAlign: "left"}}
					multiLine={true} rows={2}/>
					</div>
					<div className="col-xs-3">
					<RaisedButton type="submit" label="Submit"
					labelStyle={{fontSize:"1.2rem"}} style={{margin: "1vh 0 1vh", width: "50%"}}
					disabled={pristine || submitting} primary={true}
					/>
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
			location: PropTypes.object.isRequired,
			user: PropTypes.object.isRequired
		};