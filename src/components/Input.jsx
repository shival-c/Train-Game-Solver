import TextField from '@mui/material/TextField';
import '../styles/Styles.css'

function Inputs ( {props} ) {
    const { name, form, val, updateFunction, hasErr } = props

    const style = {
        borderLeft: "2px groove MediumSpringGreen",
        borderRadius: "8px",
        backgroundColor: "white",
    }

    return (
        <TextField
        error={hasErr}
        id="outlined-basic"
        label={name}
        variant="outlined"
        sx={!hasErr? style : {}}
        onChange={(e) => updateFunction({...form, [val]: e.target.value})}
        value={form[val]}
        />
    );
}

export default Inputs
