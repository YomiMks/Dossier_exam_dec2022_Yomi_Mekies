import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Checkbox from "@mui/material/Checkbox";
import {useState} from "react";
import {FormControlLabel, FormGroup} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

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

const modalUpdateStructure = (props) => {
    return (
        <Modal
            open={props.openModalUpdate}
            onClose={props.handleCloseUpdate}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Modifier la structure {props.formValue.name}
                </Typography>
                <div style={{display: 'flex', marginTop: '16px', marginBottom: '16px'}}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Adresse"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={props.formValue.address}
                        onChange={(e) => props.handleChange('address', e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Nom"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={props.formValue.name}
                        onChange={(e) => props.handleChange('name', e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Description"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={props.formValue.description}
                        onChange={(e) => props.handleChange('description', e.target.value)}
                    />
                </div>

                <div style={{display: 'flex'}}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={props.formValue.email}
                        onChange={(e) => props.handleChange('email', e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={props.formValue.password}
                        onChange={(e) => props.handleChange('password', e.target.value)}
                        label="Mot de passe"
                        type="password"
                    />
                </div>
                <div>
                    <FormGroup>
                        {
                            props.permissionsData.map((item, index) =>{
                                    return (
                                        <FormControlLabel
                                            key={item.id}
                                            onChange={(e) => props.handlePushPermission(e.target.value)}
                                            control={
                                                <Checkbox
                                                    value={item.id}
                                                    color="primary"
                                                />} label={item.Permission} />)
                                }
                            )
                        }
                    </FormGroup>
                </div>
                <Button variant="contained" onClick={props.handleCloseUpdate}>Annuler</Button>
                <LoadingButton
                    type="submit"
                    variant="contained"
                    loadingPosition="end"
                    endIcon={<></>}
                    onClick={(e) => props.handleUpdateStructure(e)}
                    loading={props.loading}
                >
                    Valider
                </LoadingButton >
            </Box>
        </Modal>
    );
}
export default modalUpdateStructure;
