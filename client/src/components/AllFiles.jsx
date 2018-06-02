import React from 'react';
import FileListEntry from './FileListEntry.jsx';
import Files from '../data/mockData.js';
import Dropzone from './Dropzone.jsx';
import Path from './Path.jsx';
import { withRouter } from 'react-router-dom';
import { Row, Col, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import css from '../styles/AllFiles.css';
import Search from './Search.jsx';
import $ from "jquery";
import createFolderIcon from '../assets/createFolder.png';
import _ from 'lodash';


class AllFiles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchMode: false,
      folderName: '',
      path: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.createFolder = this.createFolder.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.searchHandler = _.debounce(this.searchHandler.bind(this), 500);
    this.openFolder = this.openFolder.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.getFiles();
  }

  getFiles() {
    $.ajax ({
      type: 'GET',
      url: '/getfiles',
      contentType: 'application/json; charset=utf-8',
      success: (data, textStatus, jqXHR) => {
        this.setState({
          files: JSON.parse(data)
        })
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown); // need to decide on what we are doing here with the error
      },
    });
  }

  handleClick() {
    document.querySelector('#upload').click();
  }

  handleFiles(files) {
    // add upload key to trigger upload upon FileListEntry mount
    files.forEach(file => file.upload = true);
    this.setState({
      files: [...this.state.files].concat(files),
    });
  }

  searchHandler(value) {
    let data = {'keyword': value};
    $.ajax({
      type: 'POST',
      url: '/searchfiles',
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      success: (data, textStatus, jqXHR) => {
        this.setState({
          files: JSON.parse(data),
          searchMode: true
        });
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert('search handler error: ' + errorThrown);
      }
    });
  }

  createFolder() {
    const data = {
      folderName: this.state.folderName,
    };
    $.ajax ({
      type: 'POST',
      url: '/createFolder',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      success: (data, textStatus, jqXHR) => {
        this.toggle();
        this.getFiles();
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        this.toggleError();
      },
    });
  }

  openFolder(folderId) {
    $.ajax({
      type: 'GET',
      url: '/folder/' + folderId,
      contentType: 'application/json; charset=utf-8',
      success: (data, textStatus, jqXHR) => {
        this.setState({
          files: JSON.parse(data).result,
          path: JSON.parse(data).path
        })
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert('openFolder error: ' + errorThrown);
      },
    });
  }

  handleTitleChange(e) {
    e.preventDefault();
    this.setState({
      folderName: e.target.value
    });
  }

  handleKeyPress(e, cb) {
    if(e.charCode === 13 && e.target.value.length) {
      cb();
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render () {
    if (!this.state.files) {
      return null;
    }

    return (
      <React.Fragment>
        <Row className="mt-3">
          <Col xs="10" sm="10" md="10" lg="10">
           <Search searchHandler={this.searchHandler} handleKeyPress ={this.handleKeyPress} />
          </Col>
          <Col xs="2" sm="2" md="2" lg="2">
            <Button className="btn-sm btn-link shadow-sm" onClick={this.toggle} type="download">
              <img width="30px" background="transparent" src={createFolderIcon} alt="createFolder"/>
            </Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Folder Name</ModalHeader>
              <ModalBody>
                <Input onChange={this.handleTitleChange} onKeyPress={(e)=>{this.handleKeyPress(e, this.createFolder)}}/>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" disabled={!this.state.folderName.length} onClick={this.createFolder}>Create Folder</Button>
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
        <Path path = {this.state.path} openFolder = {this.openFolder}/>
        <Dropzone files={this.state.files} handleFiles={this.handleFiles} searchMode={this.state.searchMode}>
          {this.state.files.length
            ? this.state.files.map((file, i) => <FileListEntry key={i} file={file} openFolder={this.openFolder} />)
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
