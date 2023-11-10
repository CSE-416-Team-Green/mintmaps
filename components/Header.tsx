import LogoSmall from '@/components/LogoSmall';
import styles from '@/styles/header.module.css';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MapIcon from '@mui/icons-material/Map';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Link from 'next/link';
import Search from '@/components/Search';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.left}>
                <LogoSmall />
                <Link href='/about'>About</Link>
                <Link href='/help'>Help</Link>
            </div>
            <Search></Search>
            <div className={styles.right}>
                <IconButton>
                    <DarkModeIcon />
                </IconButton>
                <IconButton>
                    <NotificationsIcon />
                </IconButton>
                <IconButton>
                    <MapIcon />
                </IconButton>
                <IconButton>
                    <Avatar alt="Richard McKenna" src="" />
                </IconButton>
            </div>
        </div>
    )
}

export default Header;