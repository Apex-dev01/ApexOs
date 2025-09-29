import React, { useState } from 'react';
import { useQuery, useAction, getBookmarks, addBookmark } from 'wasp/client/operations';

const BookmarksPage = () => {
  const { data: bookmarks, isLoading, error } = useQuery(getBookmarks);
  const addBookmarkFn = useAction(addBookmark);
  const [newBookmark, setNewBookmark] = useState({ url: '', title: '' });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleAddBookmark = () => {
    if (newBookmark.url && newBookmark.title) {
      addBookmarkFn(newBookmark);
      setNewBookmark({ url: '', title: '' });
    }
  };

  return (
    <div className='p-6 bg-white rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold mb-4'>Bookmarks</h1>
      <div className='flex gap-x-4 mb-6'>
        <input
          type='text'
          placeholder='URL'
          className='px-2 py-2 border rounded text-lg flex-1'
          value={newBookmark.url}
          onChange={(e) => setNewBookmark({ ...newBookmark, url: e.target.value })}
        />
        <input
          type='text'
          placeholder='Title'
          className='px-2 py-2 border rounded text-lg flex-1'
          value={newBookmark.title}
          onChange={(e) => setNewBookmark({ ...newBookmark, title: e.target.value })}
        />
        <button
          onClick={handleAddBookmark}
          className='bg-blue-500 hover:bg-blue-700 px-4 py-2 text-white font-bold rounded'
        >
          Add Bookmark
        </button>
      </div>
      <div>
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className='py-2 px-2 flex items-center justify-between hover:bg-slate-100 gap-x-2 rounded'
          >
            <a href={bookmark.url} target='_blank' rel='noopener noreferrer' className='text-blue-500 hover:underline'>
              {bookmark.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarksPage;
