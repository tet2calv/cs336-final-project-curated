"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";
import { useCart } from "./CartProvider";

const Header = () => {
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <header className={styles.header}>
      <nav className={styles.navLeft}>
        <Link
          href="/"
          className={`${styles.navLink} ${
            pathname === "/" ? styles.active : ""
          }`}
        >
          HOME
        </Link>
        <Link
          href="/shop"
          className={`${styles.navLink} ${
            pathname.startsWith("/shop") ? styles.active : ""
          }`}
        >
          SHOP
        </Link>
      </nav>

      <Link href="/" className={styles.logo}>
        Curated
      </Link>

      <nav className={styles.navRight}>
        <Link href="/search" className={styles.navLink}>
          SEARCH
        </Link>
        <Link href="/cart" className={styles.navLink}>
          CART{itemCount > 0 ? ` (${itemCount})` : ""}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
