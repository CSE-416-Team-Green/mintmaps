import { TextField, IconButton, Icon } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/router";
import { useState } from 'react';

const Search = () => {
    const router = useRouter();
    const [text, setText] = useState('');

    const handleClick = async () => {
        localStorage.searchTerm = text;
        if(router.pathname != "/search-results"){
            router.push("/search-results");
        } else {
            router.reload();
        }
    }
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
            }}
        />
    )
}

export default Search;