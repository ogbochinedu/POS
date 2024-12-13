import { settingsDB } from '../db/pouchdb';
import { v4 as uuidv4 } from 'uuid';


// Create or Update Settings
export const saveSettings = async (settings) => {
  try {
    const existingSettings = await settingsDB.get('settings').catch(() => null);
    if (existingSettings) {
      const response = await settingsDB.put({ ...existingSettings, ...settings });
      return response;
    } else {
      const response = await settingsDB.put({ _id: 'settings', ...settings });
      return response;
    }
  } catch (err) {
    console.error('Error saving settings:', err);
  }
};

// Read
export const getSettings = async () => {
  try {
    return await settingsDB.get('settings');
  } catch (err) {
    console.error('Error fetching settings:', err);
  }
};
