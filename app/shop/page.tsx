"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/products";
import { Product, CategoryFilter } from "@/types/product";
import { useCart } from "@/components/CartProvider";
import styles from "./page.module.css";

const CATEGORIES: { label: string; value: CategoryFilter }[] = [
  { label: "All Products", value: "all" },
  { label: "Tops", value: "tops" },
  { label: "Bottoms", value: "bottoms" },
  { label: "Accessories", value: "accessories" },
];

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts(activeCategory);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  const handleCategoryChange = (category: CategoryFilter) => {
    setActiveCategory(category);
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.filterSection}>
          <h3 className={styles.filterTitle}>ALL PRODUCTS</h3>
          <ul className={styles.filterList}>
            {CATEGORIES.map(({ label, value }) => (
              <li key={value}>
                <button
                  onClick={() => handleCategoryChange(value)}
                  className={`${styles.filterButton} ${
                    activeCategory === value ? styles.active : ""
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className={styles.main}>
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <div className={styles.productGrid}>
            {products.map((product) => (
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
                  <button
                    className={styles.addButton}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const defaultSize = product.sizes?.[0];
                      addToCart(product, defaultSize);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ShopPage;
