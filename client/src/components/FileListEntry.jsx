import React from 'react';
import { render } from 'react-dom';
import Download from '@axetroy/react-download';
import css from '../styles/index.css';

const FileListEntry = ({file}) => (
  <div className = 'fileListEntry'>
    <Download file={file.name} content={file.name}>
      <p>{file.name}.{file.ext}</p>
    </Download>
  </div>
  );

export default FileListEntry;
