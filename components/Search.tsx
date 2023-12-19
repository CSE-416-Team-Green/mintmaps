import { TextField, IconButton, Icon, Container } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/router";
import { useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from '@mui/material/Divider';
import * as React from "react";


const Search = () => {
    const router = useRouter();
    const [text, setText] = useState('');
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);
    const [type, setType] = useState<null | String>();
    const [mapType, setMapType] = useState<null | String>();
    const [sort, setSort] = useState<null | String>();

    const open = Boolean(anchor);

    
    React.useEffect(() => {
        setType(localStorage.searchFilter);
        setMapType(localStorage.searchMapType);
        setSort(localStorage.searchSort);
    }, []);


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
        setType("title");
    };
    const handleFilterUploader = () => {
        localStorage.searchFilter = "uploader";
        setType("uploader");
    };
    const handleFilterTags = () => {
        localStorage.searchFilter = "tags";
        setType("tags");
    };

    const handleTypeBivar = () => {
        localStorage.searchMapType = "bivariate-choropleth";
        setMapType("bivariate-choropleth");
    };
    const handleTypeChor = () => {
        localStorage.searchMapType = "choropleth";
        setMapType("choropleth");
    };
    const handleTypeProp = () => {
        localStorage.searchMapType = "proportional-symbol";
        setMapType("proportional-symbol");
    };
    const handleTypeHeat = () => {
        localStorage.searchMapType = "heat";
        setMapType("heat");
    };
    const handleTypePoint = () => {
        localStorage.searchMapType = "point";
        setMapType("point");
    };
    const handleTypeNone = () => {
        localStorage.searchMapType = "";
        setMapType("");
    };

    const handleSortViews = () => {
        localStorage.searchSort = "views";
        setSort("views");
    };
    const handleSortLikes = () => {
        localStorage.searchSort = "likes";
        setSort("likes");
    };
    const handleSortDislikes = () => {
        localStorage.searchSort = "dislikes";
        setSort("dislikes");
    };
    const handleSortComments = () => {
        localStorage.searchSort = "comments";
        setSort("comments");
    };
    const handleSortDateRecent = () => {
        localStorage.searchSort = "recent";
        setSort("recent");
    };
    const handleSortDateOld = () => {
        localStorage.searchSort = "old";
        setSort("old");
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
                            "aria-labelledby": "basic-button", "dense":true,
                        }}
                    >
                        <MenuItem disabled={true}>
                            Search By:
                        </MenuItem>
                        <MenuItem onClick={handleFilterTitle} selected={type=="title" || !type}>
                            Title
                        </MenuItem>
                        <MenuItem onClick={handleFilterUploader} selected={type=="uploader"}>
                            Uploader
                        </MenuItem>
                        <MenuItem onClick={handleFilterTags} selected={type=="tags"}>
                            Tags
                        </MenuItem>

                        <Divider />

                        <MenuItem disabled={true}>
                            Map Types:
                        </MenuItem>
                        <MenuItem onClick={handleTypeNone} selected={mapType=="" || !mapType}>
                            All Map Types
                        </MenuItem>
                        <MenuItem onClick={handleTypeBivar} selected={mapType=="bivariate-choropleth"}>
                            Bivariate Choropleth
                        </MenuItem>
                        <MenuItem onClick={handleTypeChor} selected={mapType=="choropleth"}>
                            Choropleth
                        </MenuItem>
                        <MenuItem onClick={handleTypeProp} selected={mapType=="proportional-symbol"}>
                            Proportional Symbol
                        </MenuItem>
                        <MenuItem onClick={handleTypeHeat} selected={mapType=="heat"}>
                            Heat
                        </MenuItem>
                        <MenuItem onClick={handleTypePoint} selected={mapType=="point"}>
                            Point
                        </MenuItem>

                        <Divider />

                        <MenuItem disabled={true}>
                            Sort By:
                        </MenuItem>
                        <MenuItem onClick={handleSortViews} selected={sort=="views" || !sort}>
                            Views
                        </MenuItem>
                        <MenuItem onClick={handleSortLikes} selected={sort=="likes"}>
                            Likes
                        </MenuItem>
                        <MenuItem onClick={handleSortDislikes} selected={sort=="dislikes"}>
                            Dislikes
                        </MenuItem>
                        <MenuItem onClick={handleSortComments} selected={sort=="comments"}>
                            Comments
                        </MenuItem>
                        <MenuItem onClick={handleSortDateRecent} selected={sort=="recent"}>
                            Recent
                        </MenuItem>
                        <MenuItem onClick={handleSortDateOld} selected={sort=="old"}>
                            Oldest
                        </MenuItem>
                    </Menu>
                </InputAdornment>
                }}
            />

            
        
    )
}

export default Search;