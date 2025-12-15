"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getProductById } from "@/lib/products";
import { Product } from "@/types/product";
import { useCart } from "@/components/CartProvider";
import styles from "./page.module.css";

const ProductPage = () => {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const productId = params.slug as string; // The URL param is still called "slug" but it's the document ID

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductById(productId);
        setProduct(data);
        if (data?.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!product) {
    return <div className={styles.notFound}>Product not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <div className={styles.imageWrapper}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.productImage}
            priority
          />
        </div>
      </div>

      <div className={styles.detailsSection}>
        <div className={styles.productHeader}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.productCategory}>{product.category}</p>
        </div>

        <div className={styles.descriptionSection}>
          <p className={styles.description}>{product.description}</p>
        </div>

        <div className={styles.purchaseSection}>
          <p className={styles.price}>${product.price} USD</p>

          <div className={styles.sizeSelector}>
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`${styles.sizeButton} ${
                  selectedSize === size ? styles.selected : ""
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <div className={styles.actions}>
            <button
              className={styles.addToCart}
              onClick={() => addToCart(product, selectedSize)}
              disabled={!selectedSize}
            >
              ADD TO CART
            </button>

            <button
              className={styles.checkout}
              onClick={() => {
                addToCart(product, selectedSize);
                router.push("/checkout");
              }}
              disabled={!selectedSize}
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
