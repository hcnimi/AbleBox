import React from 'react';
import {Col, FormGroup, Label, Input} from 'reactstrap';

const Search = ({searchHandler}) => (
 <FormGroup row>
    <Label for="searchText" className="pr-0 d-none d-sm-block d-md-block d-lg-block" sm="2" md="1" lg="1" >Search</Label>
    <Col xs="12" sm="10" md="11" lg="11">
      <Input type="text" name="searchText" id="searchText" placeholder="search a file or folder" onChange = {(e) => {searchHandler(e.target.value)}}/>
    </Col>
 </FormGroup>
);

export default Search;

