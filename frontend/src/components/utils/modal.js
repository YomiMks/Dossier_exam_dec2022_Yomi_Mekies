import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const BasicModal = (props) => {
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Ajouter un nouveau partenaire
                </Typography>
                <div style={{display: 'flex', marginTop: '16px', marginBottom: '16px'}}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Ville"
                        onChange={(e) => props.handleChange('city', e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Nom"
                        onChange={(e) => props.handleChange('name', e.target.value)}
                    />
                </div>
                <div style={{display: 'flex'}}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        onChange={(e) => props.handleChange('email', e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        onChange={(e) => props.handleChange('password', e.target.value)}
                        label="Mot de passe"
                        type="password"
                    />
                </div>
                <Button variant="contained" onClick={props.handleClose}>Annuler</Button>
                <Button variant="contained" onClick={(e) => props.handleAddPartner(e)}>Valider</Button>
                {props.error !== false && props.error}
            </Box>
        </Modal>
    );
}
export default BasicModal;
