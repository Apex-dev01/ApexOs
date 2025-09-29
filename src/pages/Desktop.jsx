import React from 'react';
import { useQuery, useAction } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';
import { getFiles, getSettings, getBookmarks } from 'wasp/client/operations';
import { createFile, updateSettings, addBookmark } from 'wasp/client/operations';

const DesktopPage = () => {
  const { data: files, isLoading: filesLoading, error: filesError } = useQuery(getFiles);
  const { data: settings, isLoading: settingsLoading, error: settingsError } = useQuery(getSettings);
  const { data: bookmarks, isLoading: bookmarksLoading, error: bookmarksError } = useQuery(getBookmarks);

  const createFileFn = useAction(createFile);
  const updateSettingsFn = useAction(updateSettings);
  const addBookmarkFn = useAction(addBookmark);

  if (filesLoading || settingsLoading || bookmarksLoading) return 'Loading...';
  if (filesError || settingsError || bookmarksError) return 'Error loading data';

  return (
    <div className="desktop">
      <div className="taskbar bg-gray-800 text-white flex justify-between items-center p-2">
        <div className="start-menu">Start</div>
        <div className="taskbar-items">Taskbar Items</div>
      </div>
      <div className="desktop-icons flex flex-wrap p-4">
        {files.map(file => (
          <div key={file.id} className="icon bg-blue-500 text-white p-2 m-2 rounded">
            {file.name}
          </div>
        ))}
      </div>
      <div className="start-menu-content hidden bg-white p-4 rounded shadow-lg">
        <h2>Start Menu</h2>
        <button onClick={() => createFileFn({ name: 'New File', content: '' })} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Create File
        </button>
        <button onClick={() => updateSettingsFn({ theme: 'dark' })} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Set Dark Theme
        </button>
        <button onClick={() => addBookmarkFn({ url: 'https://example.com', title: 'Example' })} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
          Add Bookmark
        </button>
      </div>
    </div>
  );
};

export default DesktopPage;
