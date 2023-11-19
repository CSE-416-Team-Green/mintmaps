import LogoSmall from "@/components/LogoSmall";
import styles from "@/styles/header.module.css";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import MapIcon from "@mui/icons-material/Map";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Link from "next/link";
import Search from "@/components/Search";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import { useContext } from "react";
import ThemeContext from "./themeContext";

const Header = () => {
    const { theme, toggleTheme, mode } = useContext(ThemeContext);

    return (
        <div className={styles.header}>
            <div className={styles.left}>
                <LogoSmall />
                <Link href="/about">About</Link>
                <Link href="/help">Help</Link>
            </div>
            <Search></Search>
            <div className={styles.right}>
                <IconButton onClick={toggleTheme}>
                    {mode === "dark" ? <Brightness5Icon /> : <DarkModeIcon />}
                </IconButton>
                <IconButton href="/map-creation">
                    <MapIcon />
                </IconButton>
                <IconButton>
                    <NotificationsIcon />
                </IconButton>
                <IconButton href="/login">
                    <Avatar alt="Richard McKenna" src="" />
                </IconButton>
            </div>
        </div>
    );
};

export default Header;
