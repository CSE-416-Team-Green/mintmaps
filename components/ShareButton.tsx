import { useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

const ShareButton = () => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
        navigator.clipboard.writeText(window.location.toString());
    };

    return (
        <>
            <IconButton onClick={handleClick}>
                <ShareIcon />
            </IconButton>
            <Snackbar
                message="Copied to clibboard"
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                open={open}
            />
        </>
    );
};

export default ShareButton;