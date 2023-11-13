import React from 'react';
import { Checkbox, Box,Button, CssBaseline, Toolbar, Typography, InputBase, Paper, IconButton, Table, TableBody, TableCell, TableContainer, TableHead,Select, TableRow, TablePagination, Avatar, Chip,MenuItem,FormControl } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';




export default function UserManagement() {
 const users = [
   { avatar: '/path/to/avatar1.png', name: 'Prabodhan Fitzgerald', email: 'prabodhan@example.com',  location: 'Izaiaport', status: 'Active', id: '1' },
   { avatar: '/path/to/avatar2.png', name: 'Hiro Joyce', email: 'hiro.joyce@example.com',  location: 'Strackeside', status: 'Active', id: '2' },
   // ... other users
 ];


 // State for pagination
 const [page, setPage] = React.useState(0);
 const [rowsPerPage, setRowsPerPage] = React.useState(10);


 const [attribute, setAttribute] = React.useState('');


 const handleAttributeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
   setAttribute(event.target.value as string);
 };
 // Handle page change
 const handleChangePage = (event: unknown, newPage: number) => {
   setPage(newPage);
 };


 // Handle rows per page change
 const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
   setRowsPerPage(parseInt(event.target.value, 10));
   setPage(0);
 };


 return (
   <Box sx={{ display: 'flex' }}>
     <CssBaseline />
     {/* Drawer component if needed */}
   
     <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
       <Toolbar />
       <Typography variant="h4" component="h1" sx={{ my: 2 }}>
         User Management
       </Typography>
     
       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
         <Box sx={{ display: 'flex', gap: 2 }}>
           <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
             <InputBase
               sx={{ ml: 1, flex: 1 }}
               placeholder="Name, email, etc..."
               inputProps={{ 'aria-label': 'search users' }}
             />
             <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
               <SearchIcon />
             </IconButton>
           </Paper>
           <FormControl size="small">
             <Select
               value={attribute}
               onChange={handleAttributeChange}
               displayEmpty
               inputProps={{ 'aria-label': 'Without label' }}
               sx={{ mr: 1 }}
             >
               <MenuItem value=""><em>Attribute</em></MenuItem>
               <MenuItem value={'name'}>Name</MenuItem>
               <MenuItem value={'email'}>Email</MenuItem>
               <MenuItem value={'location'}>Location</MenuItem>
            
             </Select>
           </FormControl>
           <IconButton aria-label="filter list" sx={{ mr: 1 }}>
             <FilterListIcon />
           </IconButton>
         </Box>
       
         <Box>
           <Button
             variant="contained"
             color="primary"
             startIcon={<AddCircleOutlineIcon />}
           >
             New
           </Button>
           <IconButton aria-label="more options">
             <MoreVertIcon />
           </IconButton>
         </Box>
       </Box>
       <TableContainer component={Paper} sx={{ marginTop: 2 }}>
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
           <TableHead>
             <TableRow>
             <TableCell padding="checkbox">
               <Checkbox/>
             </TableCell>
             <TableCell>User</TableCell>
             <TableCell>Email</TableCell>
             <TableCell>Location</TableCell>
             <TableCell>Status</TableCell>
             <TableCell>ID</TableCell>
             <TableCell padding="checkbox">
            
             </TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
           {users.map((user) => (
             <TableRow key={user.name}>
               <TableCell padding="checkbox">
                 <Checkbox/>
               </TableCell>
               <TableCell component="th" scope="row">
                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
                   <Avatar src={user.avatar} sx={{ mr: 2 }} />
                   {user.name}
                 </Box>
               </TableCell>
               <TableCell>{user.email}</TableCell>


               <TableCell>{user.location}</TableCell>
               <TableCell>
                 <Chip label={user.status} color={user.status === 'Suspended' ? 'secondary' : 'primary'} />
               </TableCell>
               <TableCell>{user.id}</TableCell>
               <TableCell padding="checkbox">
                 <IconButton>
                   <MoreVertIcon />
                 </IconButton>
               </TableCell>
             </TableRow>
           ))}
           </TableBody>
         </Table>
         <TablePagination
           component="div"
           count={users.length}
           page={page}
           onPageChange={handleChangePage}
           rowsPerPage={rowsPerPage}
           onRowsPerPageChange={handleChangeRowsPerPage}
         />
       </TableContainer>
     </Box>
   </Box>
 );
}
