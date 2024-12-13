// src/db/pouchdb.js
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);

// Initialize databases for each model
const productsDB = new PouchDB('products');
const inventoryDB = new PouchDB('inventory');
const transactionsDB = new PouchDB('transactions');
const usersDB = new PouchDB('users');
const settingsDB = new PouchDB('settings');

export { productsDB, inventoryDB, transactionsDB, usersDB, settingsDB };
