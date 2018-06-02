import React from 'react';
import {Col, Row} from 'reactstrap';
import folderIcon from '../assets/Folder.png';
import css from './../styles/Path.css';

const Path = ({path, openFolder}) => (
    <Row className="mt-3">
    <Col xs="10" sm="10" md="10" lg="10">
      {path.length > 3
        ? <span key = {0}><img width="30px" src={folderIcon} alt="folder icon"/><span className = "onclick" onClick = {(e) => {openFolder(0)}}>home</span> > ...</span>
        : null
      }
      {path.length > 0
        ? path.slice(-2).map((folder, i) => (
            folder.name
              ? <span key = {i}> > <img width="30px" src={folderIcon} alt="folder icon"/><span className = "onclick" onClick = {(e) => {openFolder(folder.folder_id)}}>{folder.name}</span></span>
              : <span key = {i}><img width="30px" src={folderIcon} alt="folder icon"/><span className = "onclick" onClick = {(e) => {openFolder(folder.folder_id)}}>home</span></span>
            )
          )
        : null
      }
    </Col>
  </Row>
)

export default Path;



