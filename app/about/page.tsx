import Image from 'next/image';
import styles from './page.module.css';

const AboutPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>About Us</h1>

            {/*vision + behind the scenes*/}
            <section className={styles.section}>
                <div className={styles.textBlock}>
                    <h2 className={styles.sectionTitle}>Vision</h2>
                    <p className={styles.paragraph}>
                        We love clothes, and we love the creativity that goes into making them.
                        There's something beautiful about imagining designs, putting them into the world,
                        and maybe someday having a space where people can actually buy and wear them.
                        That dream is what's driving this whole project.
                    </p>
                    <p className={styles.paragraph}>
                        Our site will blend a typical shopping experience with a gallery/portfolio view
                        of what is being sold, something already executed by contemporary brands, which
                        was a significant inspiration for this project. Visitors and potential customers
                        will expect to encounter curated collections of individual pieces, styled lookbooks
                        featuring complete outfits on models, and the ability to "shop the look."
                    </p>
                </div>
                <div className={styles.imageBlock}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/images/about-bts1.png"
                            alt="Behind the scenes"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className={styles.image}
                        />
                    </div>
                </div>
            </section>

            {/* design */}
            <section className={styles.sectionReverse}>
                <div className={styles.imageBlock}>
                    <div className={styles.imageWrapperSmall}>
                        <Image
                            src="/images/about-bts2.png"
                            alt="Sewing and creating"
                            fill
                            sizes="(max-width: 768px) 100vw, 40vw"
                            className={styles.image}
                        />
                    </div>
                </div>
                <div className={styles.textBlock}>
                    <h2 className={styles.sectionTitle}>Design</h2>
                    <p className={styles.paragraph}>
                        More than just a transactional storefront like many big/mainstream brands,
                        this platform celebrates clothing as creative expression; anyone and everyone
                        can participate because everyone wears clothes (hopefully), so why not have
                        fun with it? It invites visitors to explore the designer's vision through
                        visual storytelling, where each collection can have its own narrative.
                    </p>
                </div>
            </section>

            {/* vision and process */}
            <section className={styles.sectionFull}>
                <h2 className={styles.sectionTitle}>Artistic Vision & Process</h2>
                <p className={styles.paragraphCentered}>
                    Ultimately, this is about building something authentic. An opportunity to not
                    only spectate artistic expertise, but to also participate in it by bringing it
                    home for your very own, which in turn also financially supports the hard work
                    to produce it. This project is a win-win opportunity for both the consumer/viewer
                    and the designer.
                </p>
                <div className={styles.wideImageWrapper}>
                    <Image
                        src="/images/about-photoshoot-bts.png"
                        alt="Photoshoot behind the scenes"
                        fill
                        sizes="100vw"
                        className={styles.image}
                    />
                </div>
            </section>

            {/* contacts */}
            <section className={styles.contactSection}>
                <h2 className={styles.sectionTitle}>Inquiries</h2>
                <div className={styles.contactGrid}>
                    <div className={styles.contactItem}>
                        <span className={styles.contactLabel}>Phone</span>
                        <a href="tel:+1234567890" className={styles.contactLink}>+1 (234) 567-890</a>
                    </div>
                    <div className={styles.contactItem}>
                        <span className={styles.contactLabel}>Email</span>
                        <a href="mailto:hello@yourbrand.com" className={styles.contactLink}>hello@yourbrand.com</a>
                    </div>
                    <div className={styles.contactItem}>
                        <span className={styles.contactLabel}>Instagram</span>
                        <a href="https://instagram.com/yourbrand" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>@yourbrand</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;