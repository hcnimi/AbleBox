import React from 'react';
import {Col, Row} from 'reactstrap';

const Path = ({path}) => (
 <Row className="mt-3">
    <Col xs="10" sm="10" md="10" lg="10">
      {path.length > 0
        ? path.slice(-3).map((folder) => (<a href="#">>{folder.name}</a>))
        : null
      }
    </Col>
  </Row>
);

export default Path;



