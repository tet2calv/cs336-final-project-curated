'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/products';
import { Product } from '@/types/product';
import styles from './page.module.css';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setAllProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);


    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            setHasSearched(false);
            return;
        }

        setHasSearched(true);
        const searchTerm = query.toLowerCase();

        const filtered = allProducts.filter((product) =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );

        setResults(filtered);
    }, [query, allProducts]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleClear = () => {
        setQuery('');
    };

    return (
        <div className={styles.container}>
            <div className={styles.searchSection}>
                <div className={styles.searchInputWrapper}>
                    <input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        placeholder="Search products..."
                        className={styles.searchInput}
                        autoFocus
                    />
                    {query && (
                        <button onClick={handleClear} className={styles.clearButton}>
                            ×
                        </button>
                    )}
                </div>
            </div>

            <div className={styles.resultsSection}>
                {loading ? (
                    <p className={styles.message}>Loading...</p>
                ) : !hasSearched ? (
                    <p className={styles.message}>Start typing to search products</p>
                ) : results.length === 0 ? (
                    <p className={styles.message}>No products found for "{query}"</p>
                ) : (
                    <>
                        <p className={styles.resultsCount}>
                            {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
                        </p>
                        <div className={styles.resultsGrid}>
                            {results.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/shop/${product.id}`}
                                    className={styles.productCard}
                                >
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src={product.imageUrl}
                                            alt={product.name}
                                            fill
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                            className={styles.productImage}
                                        />
                                    </div>
                                    <div className={styles.productInfo}>
                                        <h3 className={styles.productName}>{product.name}</h3>
                                        <p className={styles.productPrice}>${product.price} USD</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SearchPage;