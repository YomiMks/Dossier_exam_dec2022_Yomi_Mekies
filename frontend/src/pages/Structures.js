import React, { useState} from 'react';
import DataGridStructure from '../components/dataDisplay/DataGridStructure';
import {Container} from "@mui/material";
import ModalStructure from "../components/utils/modalStructure";
import {URL, ENDPOINT_API, ENDPOINT_STRUCTURE} from "../constant";
import ModalUpdateStructure from "../components/utils/modalUpdateStructure";

const Structures = (props) => {
    const { structuresData, setStructureData, structuresPermissionsData, usersData, loading, setLoading, msgSuccess, setMsgSuccess, severity, setMsg,
        setSeverity, error, partnersData, permissionsData, setOpenSnackBars} = props
    const [open, setOpen] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [formValue, setFormValue] = useState({
        address: '',
        description: '',
        name: '',
        email: '',
        password: '',
        userId: localStorage.getItem('auth') && JSON.parse(localStorage.getItem('auth')).user.id,
        partnersId: '',
        permissions: []
    })
    const [formPermissionsValue, setFormPermissionsValue] = useState([]);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (name, value) => {
        setFormValue({
            ...formValue,
            [name]: value
        })
    }
    const handleOpenUpdate = (row) => {
        let perms = []
        let partnerPerms = structuresPermissionsData.filter(perm => perm.fk_structure_id === row.id)
        if (partnerPerms.length > 0){
            permissionsData.map(item => {
                partnerPerms.map(perm => {
                    if(item.id === perm.fk_permission_id){
                        perms.push(item)
                    }
                })
            })
        }
        // permissionsData
        setFormValue(
            {
                ...row,
                id: row.id,
                address: row.address,
                name: row.name,
                userId: row.userId,
                password: usersData.find(user => user?.user_partners?.id === row.id)?.password,
                email: usersData.find(user => user?.user_partners?.id === row.id)?.email,
                permissions: perms,
                partnersId: row.partnersId
            }
        )
        setOpenModalUpdate(true)
    };
    const handleCloseUpdate = () => setOpenModalUpdate(false);

    const handleAddStructure = (e) => {
        e.preventDefault()
        setLoading(true)
        const fetchApi = fetchApiAddStructure(formValue)
        if (fetchApi){
            handleClose()
        }else {
            setMsg("Une erreur est survenue")
            setSeverity('error')
            setOpenSnackBars(true)
        }
        setLoading(false)
    }
    const handleApiUpdate = (e) => {
        e.preventDefault()
        setLoading(true)
        const fetchApi = fetchApiUpdateStructure(formValue)
        if (fetchApi){
            setMsg("Structure mis à jour avec succès")
            setSeverity('success')
            setOpenSnackBars(true)
            setMsgSuccess('Structure mis à jour avec succès')
            handleCloseUpdate()
        }else {
            setMsg("Une erreur est survenue")
            setSeverity('error')
            setOpenSnackBars(true)
        }
        setLoading(false)
    }
    const handleApiUpdateEnabled = (e, data) => {
        e.preventDefault()
        setLoading(true)
        const fetchApi = fetchApiUpdateStructure({...data, enabled: data.enabled === true ? '0' : '1'})
        if (!fetchApi) {
            setMsg("Une erreur est survenue")
            setSeverity('error')
            setOpenSnackBars(true)
        }
        setLoading(false)
    };
    const fetchApiAddStructure = async (data) => {
        const response = await fetch(`${URL +   ENDPOINT_API + ENDPOINT_STRUCTURE}`,{
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

    const fetchApiDeleteStructure = async (id) => {
        const response = await fetch(`${URL +  ENDPOINT_API + ENDPOINT_STRUCTURE}/${id}` ,{method: "DELETE",})
        if(response.ok){
            const tmp = structuresData.filter(structure => structure.id !== id)
            setStructureData(tmp)
            setMsg("Structure supprimée avec succès")
            setOpenSnackBars(true)
            setSeverity('success')
            setMsgSuccess('Structure supprimée avec succès')
            return true
        }else{
            setMsg("Une erreur est survenue")
            setSeverity('error')
            setOpenSnackBars(true)
            return false
        }
    }
    const fetchApiUpdateStructure = async (data) => {
        const response = await fetch(
            `${URL +  ENDPOINT_API + ENDPOINT_STRUCTURE}/${data.id}`  ,
            {
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }
        )
        if(response.ok){
            const dataU = structuresData.map((structure) => {
                if (structure.id !== data.id){
                    return structure
                }else {
                    return {
                        ...data
                    }
                }
            })
            setStructureData(dataU)
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

    return (
        <div>
            <Container maxWidth={'lg'}>
                <DataGridStructure
                    msgSuccess={msgSuccess}
                    handleOpen={handleOpen}
                    partnersData={partnersData}
                    structuresData={structuresData}
                    handleApiUpdateEnabled={handleApiUpdateEnabled}
                    handleOpenUpdate={handleOpenUpdate}
                    fetchApiDeleteStructure={fetchApiDeleteStructure}
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
            <ModalUpdateStructure
             loading={loading}
             handleUpdateStructure={handleApiUpdate}
             handleCloseUpdate={handleCloseUpdate}
             permissionsData={permissionsData}
             handlePushPermission={handlePushPermission}
             handleChange={handleChange}
             formValue={formValue}
             openModalUpdate={openModalUpdate}

            />
        </div>
    );
};

export default Structures;
