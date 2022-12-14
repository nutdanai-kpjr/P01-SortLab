// create mockup nav bar component

import Link from 'next/link';
import styles from '../../styles/components/page_wrapper/NavBar.module.css';
export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a>
          {' '}
          <h1 className={styles.logo}>
            Sort<span className={styles.logoPurple}>Lab</span>
          </h1>
        </a>
      </Link>

      <div className={styles.links}>
        {' '}
        <Link href="/landing">
          <a>Landing</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/pricing">
          <a>Pricing</a>
        </Link>
        <Link href="/">
          <a>Play</a>
        </Link>
      </div>
    </nav>
  );
}
