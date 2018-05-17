import React from 'react';
import FileListEntry from './FileListEntry.jsx';
import Files from '../data/mockData.js';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import $ from 'jquery';
import css from '../styles/AllFiles.css';

class AllFiles extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleFiles = this.handleFiles.bind(this);

    this.state = {
      files: Files,
    }
  }

  handleClick() {
    $('#upload').click();
  }

  handleFiles() {
    // mock upload
    const mockFiles = [];
    for (let i = 0; i < $('#upload')[0].files.length; i++) {
      mockFiles.push(Files[0]);
    }
    this.setState({
      files: this.state.files.concat(mockFiles)
    });
  }

  render () {
    return (
      <React.Fragment>
        <div>
          {this.state.files.map((file, i) => <FileListEntry key={i} file={file} download={this.props.download} onClick={this.props.onClick} />)}
        </div>
        <div>
          <input type="file" id="upload" multiple onChange={this.handleFiles} />
          <Button bsStyle="primary" bsSize="large" onClick={this.handleClick}>Upload Files</Button>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(AllFiles);
