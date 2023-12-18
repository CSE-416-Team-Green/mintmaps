import { TextField, IconButton, Icon, Container } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/router";
import { useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";


const Search = () => {
    const router = useRouter();
    const [text, setText] = useState('');
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);

    const open = Boolean(anchor);

    const handleClick = async () => {
        localStorage.searchTerm = text;
        if(router.pathname != "/search-results"){
            router.push("/search-results");
        } else {
            router.reload();
        }
    }

    const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchor(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchor(null);
    };
    
    const handleFilterTitle = () => {
        localStorage.searchFilter = "title";
    };
    
    const handleFilterUploader = () => {
        localStorage.searchFilter = "uploader";
    };
    
    const handleFilterTags = () => {
        localStorage.searchFilter = "tags";
    };

    return (
            <TextField
                size='small'
                onChange={(e) => setText(e.target.value)}
                InputProps={{
                    startAdornment: <InputAdornment position="start">
                        <IconButton onClick={handleClick}> 
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>,
                    endAdornment: <InputAdornment position="start">
                    <IconButton onClick={handleFilterClick}> 
                        <FilterAltIcon />
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
                        <MenuItem onClick={handleFilterTitle}>
                        Title
                        </MenuItem>
                        <MenuItem onClick={handleFilterUploader}>
                        Uploader
                        </MenuItem>
                        <MenuItem onClick={handleFilterTags}>
                        Tags
                        </MenuItem>
                    </Menu>
                </InputAdornment>
                }}
            />

            
        
    )
}

export default Search;