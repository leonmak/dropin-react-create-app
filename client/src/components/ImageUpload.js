import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

export default class ImageUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: ''
    };
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    console.log(file)
    let upload = request.post(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL)
                     .field('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
                     .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        console.log(response.body)
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Dropzone
          onDrop={this.onImageDrop.bind(this)}
          multiple={false}
          accept="image/*">
          <div>Drop an image or click to select a file to upload.</div>
        </Dropzone>

        <div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null :
          <div>
            <p>{this.state.uploadedFile.name}</p>
            <img alt={this.state.uploadedFileCloudinaryUrl} src={this.state.uploadedFileCloudinaryUrl} />
          </div>}
        </div>
      </div>

    )
  }
}
