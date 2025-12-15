"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import styles from "./page.module.css";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  if (items.length === 0) {
    return (
      <main className={styles.page}>
        <h1 className={styles.title}>Checkout</h1>
        <p className={styles.empty}>Your cart is empty.</p>
      </main>
    );
  }

  const placeOrder = () => {
    alert(
      `Order confirmed!\n\nName: ${name}\nEmail: ${email}\nTotal: $${subtotal.toFixed(
        2
      )}\n\n"Curated" says thank you ✨`
    );
    clearCart();
    router.push("/");
  };

  const ready = name.trim() && email.trim() && address.trim();

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Checkout</h1>

      <div className={styles.checkoutGrid}>
        <section className={styles.card}>
          <h2 className={styles.sectionTitle}>Your info</h2>

          <label className={styles.label}>
            Name
            <input
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className={styles.label}>
            Email
            <input
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className={styles.label}>
            Shipping address
            <textarea
              className={styles.textarea}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>

          <label className={styles.label}>
            Gift note (optional)
            <input
              className={styles.input}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g., “for my roommate who steals my hoodies”"
            />
          </label>
        </section>

        <aside className={styles.card}>
          <h2 className={styles.sectionTitle}>Order summary</h2>

          <div className={styles.summaryList}>
            {items.map((item) => (
              <div
                key={`${item.product.id}:${item.size ?? ""}`}
                className={styles.summaryRow}
              >
                <div>
                  <div className={styles.summaryName}>{item.product.name}</div>
                  <div className={styles.meta}>
                    {item.size ? `Size: ${item.size} · ` : ""}Qty:{" "}
                    {item.quantity}
                  </div>
                </div>
                <div className={styles.summaryPrice}>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.totalRow}>
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <button
            className={styles.checkout}
            disabled={!ready}
            onClick={placeOrder}
          >
            ✨ Place Order ✨
          </button>

          {!ready ? (
            <div className={styles.hint}>
              Fill in name, email, and address to place the order.
            </div>
          ) : note ? (
            <div className={styles.hint}>
              Gift note saved. Love that for you.
            </div>
          ) : (
            <div className={styles.hint}>
              You’re one click away from being iconic.
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
