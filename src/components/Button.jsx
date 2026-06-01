import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function Buttons( {name, handleFunction} ) {
    const style1 = {
        marginTop:"20px",
        backgroundColor: "green",
    }

    const style2 = {
        marginTop:"20px",
        backgroundColor: "red",
    }

    return (
//         <Stack direction="row" spacing={2}>
        <Button
        variant="contained"
        onClick={handleFunction}
        sx={name === "Submit" ? style1 : style2}
        >
            {name}
        </Button>
//         <Button variant="contained" disabled>
//         Disabled
//         </Button>
//         </Stack>
    );
}

export default Buttons
