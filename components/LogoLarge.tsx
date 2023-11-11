import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/logo-large.module.css';

const LogoLarge = () => {
    return (
        <div className={styles.container}>
            <Image src="/logo-green.svg" alt="MintMaps Logo" width={120} height={250} />
            <Link className={styles.logoText} href="/home">MintMaps</Link>
        </div>
    )
}

export default LogoLarge;