import { UserDocument } from '@utils';

// This is a simple in-memory store for demonstration purposes.
// In a real app, you would use a more robust state management solution or a backend.

let documents: UserDocument[] = [];

const listeners: Array<() => void> = [];

const documentStore = {
  addDocument: (doc: UserDocument) => {
    // Avoid adding duplicates
    if (!documents.find(d => d.id === doc.id)) {
        documents.push(doc);
        listeners.forEach(l => l());
    }
  },

  getDocuments: () => {
    return documents;
  },

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
