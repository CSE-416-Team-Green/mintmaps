import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/logo-small.module.css';

const LogoSmall = () => {
    return (
        <div className={styles.container}>
            <Image src="/logo-white.svg" alt="MintMaps Logo" width={48} height={48} />
            <Link className={styles.logoText} href="/home">MintMaps</Link>
        </div>
    )
}

export default LogoSmall;