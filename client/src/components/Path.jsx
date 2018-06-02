import React from 'react';
import {Col, Row} from 'reactstrap';
import folderIcon from '../assets/Folder.png';

const Path = ({path}) => (
 <Row className="mt-3">
    <Col xs="10" sm="10" md="10" lg="10">
      {path.length > 0
        ? path.slice(-3).map((folder) => (
            folder.name
              ? <a href="#"> > <img width="30px" src={folderIcon} alt="folder icon"/>{folder.name}</a>
              : <a href="#"><img width="30px" src={folderIcon} alt="folder icon"/>home</a>
            )
          )
        : null
      }
    </Col>
  </Row>
);

export default Path;



