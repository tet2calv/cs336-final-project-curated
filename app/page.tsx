import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Curated</h1>
          <p className={styles.heroSubtitle}>Curated clothing as creative expression</p>
        </div>
      </section>

      <section className={styles.categories}>
        <Link href="/collections" className={styles.categoryCard}>
          <div className={styles.categoryOverlay}>
            <span className={styles.categoryName}>Collections</span>
          </div>
        </Link>
        <Link href="/shop" className={styles.categoryCard}>
          <div className={styles.categoryOverlay}>
            <span className={styles.categoryName}>Shop</span>
          </div>
        </Link>
        <Link href="/about" className={styles.categoryCard}>
          <div className={styles.categoryOverlay}>
            <span className={styles.categoryName}>About</span>
          </div>
        </Link>
      </section>
    </main>
  );
}