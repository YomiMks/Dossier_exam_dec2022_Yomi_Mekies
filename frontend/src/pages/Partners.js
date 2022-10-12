import React, {useEffect, useState} from 'react';
import EnhancedTable from "../components/dataDisplay/EnhancedTable";
import { Container } from "@mui/material";
import Modal from "../components/utils/modal";
// parent
const Partners = ({ permissionsData }) => {

    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [msgSuccess, setMsgSuccess] = useState(false);
    const [formValue, setFormValue] = useState({
        city: '',
        name: '',
        email: '',
        password: '',
        userId: localStorage.getItem('auth') && JSON.parse(localStorage.getItem('auth')).user.id,
    })
    const [partnersData, setPartnersData] = useState([]);
    const [formPermissionsValue, setFormPermissionsValue] = useState([]);
    useEffect(() => {
        fetchApiGetPartners()
    }, []);

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
    const fetchApiGetPartners = async () => {
        const response = await fetch('http://localhost:8343/api/partners',{
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        if(response.ok){
            const result = await response.json()
            setPartnersData(result)
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
    console.log("formPermissionsValue", formPermissionsValue)

    return (
        <div>
            <Container maxWidth={'lg'}>
                {/* child component  */}
                <EnhancedTable
                    msgSuccess={msgSuccess}
                    handleOpen={handleOpen} partnersData={partnersData
                    .filter(partner => partner.userId == JSON.parse(localStorage.getItem('auth')).user.id)}/>
            </Container>
            <Modal
                permissionsData={permissionsData}
                handlePushPermission={handlePushPermission}
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
                handleOpen={handleOpen}
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
