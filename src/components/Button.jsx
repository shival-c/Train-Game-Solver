import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function Buttons( {name, handleFunction} ) {
    return (
//         <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={handleFunction}>{name}</Button>
//         <Button variant="contained" disabled>
//         Disabled
//         </Button>
//         </Stack>
    );
}

export default Buttons
