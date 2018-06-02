import React from 'react';
import { Row, Col, Progress } from 'reactstrap';
import moment from 'moment';
import css from './../styles/FileListEntry.css';
import Share from './Share.jsx';
import fileIcon from '../assets/file.png';
import folderIcon from '../assets/Folder.png';

class FileListEntry extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			uploadProgress: 0,
			upload: !!this.props.file.upload
		};

		this.download = this.download.bind(this);
	}

	componentDidMount() {
		if (this.state.upload) {
			const formData = new FormData();

			formData.append('file', this.props.file, this.props.file.name);

		  const req = new XMLHttpRequest();

		  req.open("POST", "/upload", true);

			req.upload.addEventListener("progress", e => {
	      if (e.lengthComputable) {
	      	const progress = e.loaded / e.total * 100;
	        this.setState({uploadProgress: progress});
	        if (progress === 100) {
	        	setTimeout(() => {
	        		this.setState({upload: false});
	        	}, 800);
	        }
	      }
	    }, false);

		  req.onload = function(oEvent) {
		    if (req.status == 200) {
		    	// handle success
		    } else {
		    	// handle error
		    }
		  };

		  req.send(formData);
		}
	}

	download() {

	}

	render() {
		return (
		  <Col xs="auto" className="file-list-entry py-3">
		  	<Row className="justify-content-between">
		  		<Col sm="auto">
		  			{this.props.file.is_folder
			  			? <img width="30px" src={folderIcon} alt="folder icon"/>
			  			: <img width="30px" src={fileIcon} alt="file icon"/>
		  			}
	   				<span> {this.props.file.name}</span>
	   			</Col>
		  		<Col sm="auto">
	   				<span style={{fontSize: '0.9em', color: 'gray'}}>{moment(this.props.file.lastModified).format('MM/DD/YY h:mm a')}</span>
	   			</Col>
	   			<Col sm="auto">
	   				<span><Share file={this.props.file} share={this.share}/></span>
	   			</Col>
	   		</Row>
				{this.state.upload
					? <Progress value={this.state.uploadProgress} />
					: null
				}
			</Col>
		);
	}
}

export default FileListEntry;
