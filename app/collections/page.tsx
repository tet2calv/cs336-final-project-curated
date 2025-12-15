'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCollections } from '@/lib/collections';
import { getProductById } from '@/lib/products';
import { Collection } from '@/types/collection';
import { Product } from '@/types/product';
import styles from './page.module.css';

const CollectionsPage = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [collectionProducts, setCollectionProducts] = useState<Record<string, Product[]>>({});
  const [carouselIndex, setCarouselIndex] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await getCollections();
        setCollections(data);

        // Initialize carousel indices
        const indices: Record<string, number> = {};
        data.forEach((col) => {
          indices[col.id] = 0;
        });
        setCarouselIndex(indices);
      } catch (error) {
        console.error('Error fetching collections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const handleExpand = async (collectionId: string) => {
    if (expandedId === collectionId) {
      setExpandedId(null);
      return;
    }

    setExpandedId(collectionId);

    // Fetch products for this collection if not already loaded
    if (!collectionProducts[collectionId]) {
      const collection = collections.find((c) => c.id === collectionId);
      if (collection) {
        const products = await Promise.all(
          collection.productIds.map((id) => getProductById(id))
        );
        setCollectionProducts((prev) => ({
          ...prev,
          [collectionId]: products.filter((p): p is Product => p !== null)
        }));
      }
    }
  };

  const handleCarouselPrev = (collectionId: string) => {
    setCarouselIndex((prev) => ({
      ...prev,
      [collectionId]: Math.max(0, prev[collectionId] - 1)
    }));
  };

  const handleCarouselNext = (collectionId: string, maxIndex: number) => {
    setCarouselIndex((prev) => ({
      ...prev,
      [collectionId]: Math.min(maxIndex, prev[collectionId] + 1)
    }));
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Collections</h1>

      <div className={styles.collectionsList}>
        {collections.map((collection) => {
          const isExpanded = expandedId === collection.id;
          const products = collectionProducts[collection.id] || [];
          const currentIndex = carouselIndex[collection.id] || 0;

          return (
            <div key={collection.id} className={styles.collectionCard}>
              {/* Collapsed View */}
              <button
                className={styles.collectionHeader}
                onClick={() => handleExpand(collection.id)}
              >
                <div className={styles.collectionInfo}>
                  <h2 className={styles.collectionName}>{collection.name}</h2>
                  <p className={styles.collectionSeason}>{collection.season}</p>
                </div>
                <div className={styles.collectionPreview}>
                  {collection.productIds.slice(0, 6).map((productId, index) => (
                    <div key={productId} className={styles.previewThumb}>
                      {products[index] && (
                        <Image
                          src={products[index].imageUrl}
                          alt={products[index].name}
                          fill
                          sizes="60px"
                          className={styles.previewImage}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <span className={styles.expandIcon}>{isExpanded ? '−' : '+'}</span>
              </button>

              {/* Expanded View */}
              {isExpanded && (
                <div className={styles.expandedContent}>
                  <div className={styles.expandedTop}>
                    <div className={styles.collectionDetails}>
                      <h3 className={styles.detailsTitle}>{collection.name}</h3>
                      <p className={styles.detailsSeason}>{collection.season}</p>
                      <p className={styles.detailsDescription}>{collection.description}</p>
                      <p className={styles.detailsDesign}>{collection.designChoices}</p>
                    </div>

                    <div className={styles.productCarousel}>
                      <button
                        className={styles.carouselArrow}
                        onClick={() => handleCarouselPrev(collection.id)}
                        disabled={currentIndex === 0}
                      >
                        ‹
                      </button>

                      <div className={styles.carouselTrack}>
                        <div
                          className={styles.carouselSlider}
                          style={{ transform: `translateX(-${currentIndex * 140}px)` }}
                        >
                          {products.map((product) => (
                            <Link
                              key={product.id}
                              href={`/shop/${product.id}`}
                              className={styles.carouselItem}
                            >
                              <div className={styles.carouselImageWrapper}>
                                <Image
                                  src={product.imageUrl}
                                  alt={product.name}
                                  fill
                                  sizes="120px"
                                  className={styles.carouselImage}
                                />
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      <button
                        className={styles.carouselArrow}
                        onClick={() => handleCarouselNext(collection.id, Math.max(0, products.length - 4))}
                        disabled={currentIndex >= products.length - 4}
                      >
                        ›
                      </button>
                    </div>
                  </div>

                  {/* Lookbook Gallery */}
                  {collection.lookbookImages && collection.lookbookImages.length > 0 && (
                    <div className={styles.lookbook}>
                      <h4 className={styles.lookbookTitle}>Lookbook</h4>
                      <div className={styles.lookbookGrid}>
                        {collection.lookbookImages.map((imageUrl, index) => (
                          <div key={index} className={styles.lookbookImage}>
                            <Image
                              src={imageUrl}
                              alt={`${collection.name} lookbook ${index + 1}`}
                              fill
                              sizes="(max-width: 768px) 50vw, 25vw"
                              className={styles.lookbookImg}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CollectionsPage;