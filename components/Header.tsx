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
import { useContext, useState } from "react";
import ThemeContext from "./themeContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import AuthContext from "./authContext";

const Header = () => {
    const { theme, toggleTheme, mode } = useContext(ThemeContext);
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);
    const authContext = useContext(AuthContext);

    const router = useRouter();
    const open = Boolean(anchor);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchor(event.currentTarget);
    };

    const handleCloseLogout = () => {
        setAnchor(null);
        authContext.onLoggingOut();
        router.push("/login");
    };

    const handleClose = () => {
        setAnchor(null);
    };

    const handleProfileClose = () => {
        setAnchor(null);
        router.push("/user-profile");
    };

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
                <IconButton href="/map-creation" data-cy="map-button">
                    <MapIcon />
                </IconButton>
                <IconButton>
                    <NotificationsIcon />
                </IconButton>
                <IconButton onClick={handleClick}>
                    <Avatar alt="Richard McKenna" src="" />
                </IconButton>

                <Menu
                    id="basic-menu"
                    anchorEl={anchor}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >
                    <MenuItem onClick={handleProfileClose}>Edit Profile</MenuItem>
                    <MenuItem href={"/logout"} onClick={handleCloseLogout}>
                        Logout
                    </MenuItem>
                </Menu>
            </div>
        </div>
    );
};

export default Header;
