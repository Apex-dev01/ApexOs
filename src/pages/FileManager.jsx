import React, { useState } from 'react';
import { useQuery, useAction, getFiles, createFile } from 'wasp/client/operations';

const FileManagerPage = () => {
  const { data: files, isLoading, error } = useQuery(getFiles);
  const createFileFn = useAction(createFile);
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateFile = () => {
    createFileFn({ name: fileName, content: fileContent });
    setFileName('');
    setFileContent('');
  };

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='File Name'
          className='mr-2 px-2 py-1 border rounded'
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
        <textarea
          placeholder='File Content'
          className='mr-2 px-2 py-1 border rounded'
          value={fileContent}
          onChange={(e) => setFileContent(e.target.value)}
        />
        <button
          onClick={handleCreateFile}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Create File
        </button>
      </div>
      <div>
        {files.map((file) => (
          <div
            key={file.id}
            className='mb-2 p-2 border rounded shadow-sm'
          >
            <div className='font-bold'>{file.name}</div>
            <div>{file.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileManagerPage;
