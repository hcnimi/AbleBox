import React from 'react';
import FileListEntry from './FileListEntry.jsx';
import Files from '../data/mockData.js';
import Dropzone from './Dropzone.jsx';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import css from '../styles/AllFiles.css';


class AllFiles extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleFiles = this.handleFiles.bind(this);

    this.state = {
      files: []
    };
  }

  handleClick() {
    document.querySelector('#upload').click();
  }

  handleFiles(files) {
    this.setState({
      files: [...this.state.files].concat(files)
    });
  }

  render () {
    return (
      <React.Fragment>
        <Dropzone files={this.state.files} inProgressFiles={this.state.inProgressFiles} handleFiles={this.handleFiles}>
        {this.state.files.length
          ? this.state.files.map((file, i) => <FileListEntry key={i} file={file} />)
          : null
        }
        </Dropzone>
        <Row className="mt-3">
          <Col xs="12">
            <input type="file" id="upload" multiple onChange={e => this.handleFiles([...e.target.files])} />
            <Button color="primary" size="large" onClick={this.handleClick}>Upload Files</Button>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default withRouter(AllFiles);
