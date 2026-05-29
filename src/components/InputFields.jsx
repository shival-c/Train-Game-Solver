import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function BasicTextFields( {props} ) {
    const { name, form, val, updateFunction } = props
    return (
        <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        >
            <TextField id="outlined-basic" label={name} variant="outlined" style={{ backgroundColor: "white" }}
            onChange={(e) => updateFunction({...form, [val]: e.target.value})} value={form[val]} />
        </Box>
    );
}

export default BasicTextFields
