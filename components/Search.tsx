import { TextField, IconButton, Icon } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/navigation";

const Search = () => {
    const router = useRouter();
    const handleClick = async () => {

        const payload = {
            type: "",
            filter: "",
            sort: "",
            searchTerm: ""
        }


        try {
            const response = await fetch('/api/searchMaps', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
    
            if (response.ok) {
                console.log(response.body);
                router.push("/search-results");
                console.log(response);
            } else {

            }
        }catch (error) {
            console.error('Error performing search:', error);
            alert('An error occurred while performing your search.');
        }
    }
    return (
        <TextField
            size='small'
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