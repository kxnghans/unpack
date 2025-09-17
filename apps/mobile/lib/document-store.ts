/**
 * This file defines a simple in-memory store for managing user documents.
 * It uses a listener pattern to notify components of changes.
 */
import { UserDocument } from '@utils';

// This is a simple in-memory store for demonstration purposes.
// In a real app, you would use a more robust state management solution or a backend.

let documents: UserDocument[] = [];

const listeners: Array<() => void> = [];

/**
 * A simple in-memory store for documents.
 */
const documentStore = {
  /**
   * Adds a document to the store.
   * @param {UserDocument} doc - The document to add.
   */
  addDocument: (doc: UserDocument) => {
    // Avoid adding duplicates
    if (!documents.find(d => d.id === doc.id)) {
        documents.push(doc);
        listeners.forEach(l => l());
    }
  },

  /**
   * Gets all the documents from the store.
   * @returns {UserDocument[]} The documents in the store.
   */
  getDocuments: () => {
    return documents;
  },

  /**
   * Subscribes to changes in the store.
   * @param {() => void} listener - The listener to subscribe.
   * @returns {() => void} A function to unsubscribe the listener.
   */
  subscribe: (listener: () => void) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  },
};

export default documentStore;
