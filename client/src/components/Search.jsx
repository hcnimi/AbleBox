import React from 'react';
import {Col, FormGroup, Label, Input} from 'reactstrap';

const Search = ({searchHandler}) => (
 <FormGroup row>
   <Col xs="2" sm="2" md="2" lg="2">
    <Label for="searchText" className="pr-0 d-none d-sm-block d-md-block d-lg-block" sm="2" md="1" lg="1" >Search</Label>
   </Col>
    <Col xs="8" sm="8" md="8" lg="8">
      <Input type="text" name="searchText" id="searchText" placeholder="search a file or folder" onChange = {(e) => {searchHandler(e.target.value)}}/>
    </Col>
 </FormGroup>
);

export default Search;

