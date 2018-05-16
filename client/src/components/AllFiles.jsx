import React from 'react';
import FileListEntry from './FileListEntry.jsx';
import Files from '../data/mockData.js';
import { withRouter } from 'react-router-dom';

class AllFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: Files,
    }
  }

  render () {
    return (
      <div>
        {this.state.files.map((file, i) => <FileListEntry  file = {file} download = {this.props.download} onClick={this.props.onClick} />)}
      </div>
    )
  }
}

export default withRouter(AllFiles);
