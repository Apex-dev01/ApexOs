import React, { useState, useEffect } from 'react';
import { useQuery, useAction } from 'wasp/client/operations';
import { getSettings, updateSettings } from 'wasp/client/operations';

const SettingsPage = () => {
  const { data: settings, isLoading, error } = useQuery(getSettings);
  const updateSettingsFn = useAction(updateSettings);
  const [theme, setTheme] = useState('');

  useEffect(() => {
    if (settings) {
      setTheme(settings.theme);
    }
  }, [settings]);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleSave = () => {
    updateSettingsFn({ theme });
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Settings</h1>
      <div className='mb-4'>
        <label className='block mb-2'>Theme</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className='border rounded px-2 py-1'
        >
          <option value='light'>Light</option>
          <option value='dark'>Dark</option>
        </select>
      </div>
      <button
        onClick={handleSave}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Save Settings
      </button>
    </div>
  );
};

export default SettingsPage;
