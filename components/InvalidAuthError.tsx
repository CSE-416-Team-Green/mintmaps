import { Box } from '@mui/material';
import Header from './Header';

const InvalidAuthError = () => {
    return (
        <Box>
            <Header />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '75vh',
            }}>
                <h1>Invalid Auth</h1>
                <p>Please log in to continue</p>
            </Box>
        </Box>
    );
}

export default InvalidAuthError;