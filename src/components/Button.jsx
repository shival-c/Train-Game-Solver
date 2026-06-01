import Button from '@mui/material/Button';

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
        <Button
        variant="contained"
        onClick={handleFunction}
        sx={name === "Submit" ? style1 : style2}
        onKeyDown={(e) => console.log(e.key)}
        >
            {name}
        </Button>
    );
}

export default Buttons
