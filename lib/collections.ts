import { db } from './firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { Collection } from '@/types/collection';

const COLLECTIONS_COLLECTION = 'collections';

export const getCollections = async (): Promise<Collection[]> => {
    const collectionsRef = collection(db, COLLECTIONS_COLLECTION);
    const snapshot = await getDocs(collectionsRef);

    return snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
    } as Collection));
};

export const getCollectionById = async (id: string): Promise<Collection | null> => {
    const docRef = doc(db, COLLECTIONS_COLLECTION, id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
        return null;
    }

    return {
        id: snapshot.id,
        ...snapshot.data()
    } as Collection;
};