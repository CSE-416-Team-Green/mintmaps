import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
    return (
        <TextField
            size='small'
            InputProps={{
                startAdornment: <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>,
            }}
        />
    )
}

export default Search;