import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../styles/Styles.css'

function Inputs ( {props} ) {
    const { name, form, val, updateFunction, hasErr } = props

    const style = {
        borderLeft: "5px solid MediumSpringGreen",
        backgroundColor: "cream",
    }

    const styleErr = {
        borderLeft: "5px solid Red",
        backgroundColor: "cream",
        outline: "10px Red",
    }

    return (
        <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        >
            <TextField id="outlined-basic" label={name} variant="outlined" sx={hasErr ? styleErr : style}
            onChange={(e) => updateFunction({...form, [val]: e.target.value})} value={form[val]} />
        </Box>
    );
}

export default Inputs
