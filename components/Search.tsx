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

    const handleTypeBivar = () => {
        localStorage.searchMapType = "bivariate-choropleth";
    };
    const handleTypeChor = () => {
        localStorage.searchMapType = "choropleth";
    };
    const handleTypeProp = () => {
        localStorage.searchMapType = "proportional-symbol";
    };
    const handleTypeHeat = () => {
        localStorage.searchMapType = "heat";
    };
    const handleTypePoint = () => {
        localStorage.searchMapType = "point";
    };
    const handleTypeNone = () => {
        localStorage.searchMapType = "";
    };

    const handleSortViews = () => {
        localStorage.searchSort = "views";
    };
    const handleSortLikes = () => {
        localStorage.searchSort = "likes";
    };
    const handleSortDislikes = () => {
        localStorage.searchSort = "dislikes";
    };
    const handleSortComments = () => {
        localStorage.searchSort = "comments";
    };
    const handleSortDateRecent = () => {
        localStorage.searchSort = "recent";
    };
    const handleSortDateOld = () => {
        localStorage.searchSort = "old";
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

                        <MenuItem onClick={handleTypeBivar}>
                            Bivariate Choropleth
                        </MenuItem>
                        <MenuItem onClick={handleTypeChor}>
                            Choropleth
                        </MenuItem>
                        <MenuItem onClick={handleTypeProp}>
                            Proportional Symbol
                        </MenuItem>
                        <MenuItem onClick={handleTypeHeat}>
                            Heat
                        </MenuItem>
                        <MenuItem onClick={handleTypePoint}>
                            Point
                        </MenuItem>
                        <MenuItem onClick={handleTypeNone}>
                            None
                        </MenuItem>

                        <MenuItem onClick={handleSortViews}>
                            Views
                        </MenuItem>
                        <MenuItem onClick={handleSortLikes}>
                            Likes
                        </MenuItem>
                        <MenuItem onClick={handleSortDislikes}>
                            Dislikes
                        </MenuItem>
                        <MenuItem onClick={handleSortComments}>
                            Comments
                        </MenuItem>
                        <MenuItem onClick={handleSortDateRecent}>
                            Recent
                        </MenuItem>
                        <MenuItem onClick={handleSortDateOld}>
                            Oldest
                        </MenuItem>
                    </Menu>
                </InputAdornment>
                }}
            />

            
        
    )
}

export default Search;