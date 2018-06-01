import React from 'react';
import Helmet from 'react-helmet';
import { Row, Col, Progress } from 'reactstrap';
import css from '../styles/Share.css';
import $ from 'jquery';

class Share extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // change file acl to public
    $.ajax({
      type: 'GET',
      url: '/share',
      data: this.props.file,
      contentType: 'application/json; charset=utf-8',
    })
    .done(() => {
      FB.ui({
        method: 'share',
        display: 'popup',
        href: 'https://s3-us-west-1.amazonaws.com/ablebox/' + this.props.file.s3_objectId
      }, function(response){});
    })
    .fail(() => {
      alert('failed to share');
    });
  }

  render () {
    return (
      <div className="share">
        <Helmet>
          <meta property="og:url" content={'"https://s3-us-west-1.amazonaws.com/ablebox/' + this.props.file.s3_objectId + '"'}/>
          <meta property="og:title" content={'"' + this.props.file.name + '"'} />
        </Helmet>
        <Col sm="auto">
          <div id="shareBtn" className="btn btn-success clearfix" onClick={this.handleClick}>Share</div>
        </Col>
      </div>
    );
  }
}

export default Share;