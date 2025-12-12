import { db } from './firebase';
import {
    collection,
    getDocs,
    query,
    where,
    doc,
    getDoc
} from 'firebase/firestore';
import { Product, CategoryFilter } from '@/types/product';

const productsCollection = 'products';

export const getProducts = async (category?: CategoryFilter): Promise<Product[]> => {
    const productsRef = collection(db, productsCollection);

    const q = category && category !== 'all'
        ? query(productsRef, where('category', '==', category))
        : productsRef;

    const snapshot = await getDocs(q);

    return snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
    } as Product));
};

//fetch via document id for readability
export const getProductById = async (id: string): Promise<Product | null> => {
    const docRef = doc(db, productsCollection, id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
        return null;
    }

    return {
        id: snapshot.id,
        ...snapshot.data()
    } as Product;
};