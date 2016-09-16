import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

export default class ImageUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: null,
      uploadedUrl: ''
    };

    this.onImageDrop = this.onImageDrop.bind(this);
  }

  onImageDrop(e) {
    const files = e.currentTarget.files;
    this.setState({ uploadedFile: files[0] });
    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL)
                     .field('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
                     .field('file', file);

    upload.end((err, response) => {
      if (err) { console.error(err) }
      if (response.body.secure_url !== '') {
        this.props.input.onChange(response.body.public_id);
        this.setState({ uploadedUrl: response.body.secure_url });
      }
    });
  }

  render() {
    const {uploadedUrl, uploadedFile} = this.state;
    return (
      <div>
        <input onChange={this.onImageDrop} type="file" accept="image/*" />

        <div>
          {uploadedUrl === '' ? null :
          <div>
            <p>{uploadedFile.name}</p>
            <img alt={uploadedUrl} src={uploadedUrl} />
          </div>}
        </div>
      </div>

    )
  }
}
