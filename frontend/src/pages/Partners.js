import React, { useState } from 'react';
import EnhancedTable from "../components/dataDisplay/EnhancedTable";
import { Container } from "@mui/material";
import Modal from "../components/utils/modal";
// parent
const Partners = () => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [formValue, setFormValue] = useState({
        city: '',
        name: '',
        email: '',
        password: ''
    })
    const [partnersData, setPartnersData] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (name, value) => {
        setFormValue({
            ...formValue,
            [name]: value
        })
    }
    const handleAddPartner = (e) => {
        e.preventDefault()
        const fetchApi = fetchApiAddPartner(formValue)
        if (fetchApi){
            handleClose()
        }else {
            setError("Une erreur c'est produit")
        }
    }
    const fetchApiAddPartner = async (data) => {
        console.log(data)
        const response = await fetch('http://localhost:8343/api/partners',{
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        if(response.ok){
            const result = await response.json()
            //partnersData.push(result.newPartner)
            console.log(result)
            return true
        }else{
            return false
        }
    }
    return (
        <div>
            <Container maxWidth={'lg'}>
                {/* child component  */}
                <EnhancedTable handleOpen={handleOpen} />
            </Container>
            <Modal
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
                handleOpen={handleOpen}
                handleChange={handleChange}
                formValue={formValue}
                handleAddPartner={handleAddPartner}
                error={error}
            />
        </div>
    )
}

export default Partners;
