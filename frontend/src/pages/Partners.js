import React, {useEffect, useState} from 'react';
import EnhancedTable from "../components/dataDisplay/EnhancedTable";
import { Container } from "@mui/material";
import Modal from "../components/utils/modal";
import ModalUpdatePartner from "../components/utils/modalUpdatePartner";
// parent
const Partners = (props) => {
    const {partnersPermissionsData, usersData, loading, setLoading, msgSuccess, setMsgSuccess, severity, setSeverity, error, setError, partnersData, setPartnersData, permissionsData} = props

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
        let partnerPerms = partnersPermissionsData.filter(perm => perm.fk_partner_id === 4)
        if (partnerPerms.length > 0){
            permissionsData.map(item => {
                partnerPerms.map(perm => {
                    if(item.id === perm.fk_permission_id){
                        perms.push(item)
                    }
                })
            })
        }
        console.log('perms', perms)
        // permissionsData
        console.log("row", row)
        setFormValue(
            {
                city: row.city,
                name: row.name,
                userId: row.userId,
                password: usersData.find(user => user?.user_partners?.id === row.id)?.password,
                email: usersData.find(user => user?.user_partners?.id === row.id)?.email,
                permissions: []
            }
        )
        setOpenModalUpdate(true)
    };
    const handleClose = () => setOpen(false);
    const handleCloseUpdate = () => setOpenModalUpdate(false);
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
            partnersData.push(result.newPartner)
            setMsgSuccess('Nouveau partenaire enregistré avec succès')
            return true
        }else{
            return false
        }
    }
    const fetchApiDeletePartner = async (id) => {
        const response = await fetch('http://localhost:8343/api/partners/' + id ,{method: "DELETE",})
        if(response.ok){
            const tmp = partnersData.filter(partner => partner.id !== id)
            setPartnersData(tmp)
            setMsgSuccess('Nouveau partenaire supprimé avec succès')
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
                permissionsData={permissionsData}
                handlePushPermission={handlePushPermission}
                open={openModalUpdate}
                setOpen={setOpenModalUpdate}
                handleClose={handleCloseUpdate}
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
