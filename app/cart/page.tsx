"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import styles from "./page.module.css";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeFromCart } = useCart();

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Cart</h1>

      {items.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path
                d="M7 9V7a5 5 0 0 1 10 0v2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M6.5 9h11l-1 12h-9l-1-12Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className={styles.empty}>Your cart is empty.</p>
          <p className={styles.emptySub}>Go find something iconic.</p>

          <Link href="/shop" className={styles.emptyCta}>
            Go shop
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.list}>
            {items.map((item) => (
              <div
                key={`${item.product.id}:${item.size ?? ""}`}
                className={styles.item}
              >
                <div className={styles.left}>
                  <div className={styles.name}>{item.product.name}</div>
                  {item.size ? (
                    <div className={styles.meta}>Size: {item.size}</div>
                  ) : null}
                  <div className={styles.meta}>${item.product.price} USD</div>
                </div>

                <div className={styles.right}>
                  <input
                    className={styles.qty}
                    type="number"
                    min={1}
                    max={99}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        item.product.id,
                        Number(e.target.value),
                        item.size
                      )
                    }
                  />

                  <div className={styles.price}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>

                  <button
                    className={styles.remove}
                    onClick={() => removeFromCart(item.product.id, item.size)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.footer}>
            <div className={styles.subtotal}>
              Subtotal: ${subtotal.toFixed(2)}
            </div>

            <Link href="/checkout">
              <button className={styles.checkout}>Checkout</button>
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
