import React from 'react';
import File from './File.jsx';

class AllFiles extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        {props.files.map((file, i) => <File key={i} file={file} onClick={props.onClick} />)}
      </div>
    )
  }
}

export default AllFiles;
