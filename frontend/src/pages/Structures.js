import React, {useEffect, useState} from 'react';
import DataGridStructure from '../components/dataDisplay/DataGridStructure';
import {Container} from "@mui/material";
import ModalStructure from "../components/utils/modalStructure";

const Structures = ({permissionsData, partnersData}) => {
    console.log('partnerData', partnersData)
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [msgSuccess, setMsgSuccess] = useState(false);
    const [formValue, setFormValue] = useState({
        address: '',
        description: '',
        name: '',
        email: '',
        password: '',
        userId: localStorage.getItem('auth') && JSON.parse(localStorage.getItem('auth')).user.id,
        partnersId: ''
    })
    const [structuresData, setStructureData] = useState([]);
    const [formPermissionsValue, setFormPermissionsValue] = useState([]);
    useEffect(() => {
        fetchApiGetStructure();
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (name, value) => {
        setFormValue({
            ...formValue,
            [name]: value
        })
    }
    const handleAddStructure = (e) => {
        e.preventDefault()
        const fetchApi = fetchApiAddStructure(formValue)
        if (fetchApi){
            handleClose()
        }else {
            setError("Une erreur c'est produit")
        }
    }
    const fetchApiAddStructure = async (data) => {
        const response = await fetch('http://localhost:8343/api/structure',{
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        if(response.ok){
            const result = await response.json()
            structuresData.push(result.newStructure)
            setMsgSuccess('Nouvelle structure enregistrée avec succès')
            return true
        }else{
            return false
        }
    }
    const fetchApiGetStructure = async () => {
        const response = await fetch('http://localhost:8343/api/structure',{
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        if(response.ok){
            const result = await response.json()
            setStructureData(result)
            return true
        }else{
            return false
        }
    }
    const handlePushPermission = (permissionId) => {
        let tmp = formPermissionsValue;
        if(tmp.length === 0){
            tmp.push(permissionId)
        }else {
            const findPermission = formPermissionsValue.find(item => item === permissionId)
            if(findPermission === undefined){
                tmp.push(permissionId)
            }else {
                tmp = tmp.filter(tmp => tmp !== permissionId)
            }
        }
        setFormPermissionsValue(tmp)
    }
    console.log(structuresData)
    return (
        <div>
            <Container maxWidth={'lg'}>
                <DataGridStructure
                    msgSuccess={msgSuccess}
                    handleOpen={handleOpen}
                    partnersData={partnersData}
                    structuresData={structuresData}

                />
            </Container>
            <ModalStructure
                permissionsData={permissionsData}
                handlePushPermission={handlePushPermission}
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
                handleOpen={handleOpen}
                handleChange={handleChange}
                setFormPermissionsValue={setFormPermissionsValue}
                formValue={formValue}
                partnersData={partnersData}
                handleAddStructure={handleAddStructure}
                error={error}
            />
        </div>
    );
};

export default Structures;
