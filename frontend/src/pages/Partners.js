import React, {useEffect, useState} from 'react';
import EnhancedTable from "../components/dataDisplay/EnhancedTable";
import { Container } from "@mui/material";
import Modal from "../components/utils/modal";
import ModalUpdatePartner from "../components/utils/modalUpdatePartner";
import {URL, PORT, ENDPOINT_API, ENDPOINT_PARTNERS} from "../constant";

// parent
const Partners = (props) => {
    const {partnersPermissionsData, usersData, loading, setLoading, msgSuccess, setMsgSuccess, severity, setMsg,
        setSeverity, error, setError, partnersData, setPartnersData, permissionsData, setOpenSnackBars} = props

    const [open, setOpen] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [formPermissionsValue, setFormPermissionsValue] = useState([]);

    const [formValue, setFormValue] = useState({
        city: '',
        name: '',
        email: '',
        password: '',
        userId: localStorage.getItem('auth') && JSON.parse(localStorage.getItem('auth')).user.id,
        permissions: formPermissionsValue
    })

    const handleOpen = () => setOpen(true);
    const handleOpenUpdate = (row) => {
        let perms = []
        let partnerPerms = partnersPermissionsData.filter(perm => perm.fk_partner_id === row.id)
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
                city: row.city,
                name: row.name,
                userId: row.userId,
                password: usersData.find(user => user?.user_partners?.id === row.id)?.password,
                email: usersData.find(user => user?.user_partners?.id === row.id)?.email,
                permissions: perms
            }
        )
        setOpenModalUpdate(true)
    };
    const handleCloseUpdate = () => setOpenModalUpdate(false);

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
            setMsg("Une erreur est survenue")
            setSeverity('error')
            setOpenSnackBars(true)
        }
    }
    const handleUpdatePartner = (e) => {
        e.preventDefault()
        setLoading(true)
        const fetchApi = fetchApiUpdatePartner(formValue)
        if (fetchApi){
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
        const fetchApi = fetchApiUpdatePartner({...data, enabled: data.enabled === true ? '0' : '1'})
        if (!fetchApi) {
            setMsg("Une erreur est survenue")
            setSeverity('error')
            setOpenSnackBars(true)
        }
    };
    const fetchApiAddPartner = async (data) => {
        const response = await fetch(`${URL  +  ENDPOINT_API + ENDPOINT_PARTNERS}`,{
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        if(response.ok){
            const result = await response.json()
            partnersData.push(result.newPartner)
            setMsg("Nouveau partenaire enregistré avec succès")
            setSeverity('success')
            setOpenSnackBars(true)
            setMsgSuccess('Nouveau partenaire enregistré avec succès')
            return true
        }else{
            return false
        }
    }
    const fetchApiDeletePartner = async (id) => {
        const response = await fetch(`${URL +  ENDPOINT_API + ENDPOINT_PARTNERS}` + id ,{method: "DELETE",})
        if(response.ok){
            const tmp = partnersData.filter(partner => partner.id !== id)
            setPartnersData(tmp)
            setMsg("Partenaire supprimé avec succès")
            setOpenSnackBars(true)
            setSeverity('success')
            setMsgSuccess('Partenaire supprimé avec succès')
            return true
        }else{
            return false
        }
    }
    const fetchApiUpdatePartner = async (data) => {
        const response = await fetch(
            `${URL +  ENDPOINT_API + ENDPOINT_PARTNERS}/${data.id}`  ,
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
            const dataU = partnersData.map((partner) => {
                if (partner.id !== data.id){
                    return partner
                }else {
                    return {
                        ...data
                    }
                }
            })
            setMsg("Nouveau partenaire mis à jour avec succès")
            setSeverity('success')
            setOpenSnackBars(true)
            setMsgSuccess('Nouveau partenaire mis à jour avec succès')
            setPartnersData(dataU)
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
                {/* child component  */}
                <EnhancedTable
                    handleApiUpdateEnabled={handleApiUpdateEnabled}
                    msgSuccess={msgSuccess}
                    handleOpen={handleOpen}
                    handleOpenUpdate={handleOpenUpdate}
                    fetchApiDeletePartner={fetchApiDeletePartner}
                    partnersData={partnersData.filter(partner => partner.userId == JSON.parse(localStorage.getItem('auth')).user.id)}/>
            </Container>
            <Modal
                permissionsData={permissionsData}
                handlePushPermission={handlePushPermission}
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
                handleOpen={handleOpen}
                partnersData={partnersData}
                handleChange={handleChange}
                setFormPermissionsValue={setFormPermissionsValue}
                formValue={formValue}
                handleAddPartner={handleAddPartner}
                error={error}
            />
            <ModalUpdatePartner
                loading={loading}
                permissionsData={permissionsData}
                handlePushPermission={handlePushPermission}
                open={openModalUpdate}
                setOpen={setOpenModalUpdate}
                handleClose={handleCloseUpdate}
                handleUpdatePartner={handleUpdatePartner}
                handleOpen={handleOpenUpdate}
                partnersData={partnersData}
                handleChange={handleChange}
                setFormPermissionsValue={setFormPermissionsValue}
                formValue={formValue}
                handleAddPartner={handleAddPartner}
                error={error}
            />
        </div>
    )
}

export default Partners;
