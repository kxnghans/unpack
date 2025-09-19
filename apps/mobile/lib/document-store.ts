import { UserDocument } from '@utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DOCUMENTS_KEY = 'user_documents';

let documents: UserDocument[] = [];
const listeners: Array<() => void> = [];

const documentStore = {
  async addDocument(doc: UserDocument) {
    if (!documents.find(d => d.id === doc.id)) {
      documents.push(doc);
      await this.saveDocuments();
      listeners.forEach(l => l());
    }
  },

  async deleteDocument(docId: string) {
    documents = documents.filter(d => d.id !== docId);
    await this.saveDocuments();
    listeners.forEach(l => l());
  },

  async getDocuments(): Promise<UserDocument[]> {
    try {
      const storedDocs = await AsyncStorage.getItem(DOCUMENTS_KEY);
      if (storedDocs) {
        documents = JSON.parse(storedDocs);
      }
    } catch (error) {
      console.error('Failed to load documents from storage', error);
    }
    return documents;
  },

  async saveDocuments() {
    try {
      await AsyncStorage.setItem(DOCUMENTS_KEY, JSON.stringify(documents));
    } catch (error) {
      console.error('Failed to save documents to storage', error);
    }
  },

  subscribe(listener: () => void): () => void {
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
