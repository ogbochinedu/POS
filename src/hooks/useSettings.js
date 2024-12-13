import { useState, useEffect } from 'react';
import { settingsDB } from '../db/pouchdb';

// Custom hook for settings management
const useSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch settings from the database
  const getSettings = async () => {
    setLoading(true);
    try {
      const result = await settingsDB.get('settings');
      setSettings(result);
    } catch (err) {
      setError('Error fetching settings');
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  // Save or update settings in the database
  const saveSettings = async (newSettings) => {
    setLoading(true);
    try {
      const existingSettings = await settingsDB.get('settings').catch(() => null);
      if (existingSettings) {
        // Update existing settings
        await settingsDB.put({
          ...existingSettings,
          ...newSettings,
        });
      } else {
        // Create new settings
        await settingsDB.put({
          _id: 'settings', // Use a fixed ID for settings
          ...newSettings,
        });
      }
      await getSettings(); // Refresh the settings after saving
    } catch (err) {
      setError('Error saving settings');
      console.error('Error saving settings:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch settings when the component mounts
  useEffect(() => {
    getSettings();
  }, []);

  return {
    settings,
    loading,
    error,
    saveSettings,
  };
};

export default useSettings;
