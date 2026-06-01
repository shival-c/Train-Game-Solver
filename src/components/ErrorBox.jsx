import Alert from '@mui/material/Alert';

export default function ErrorBox({ errMsg }) {
    return (
        <Alert severity="error">{errMsg}</Alert>
    );
}
