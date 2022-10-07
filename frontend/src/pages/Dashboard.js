import React from 'react';
import BasicTable from "../components/dataDisplay/BasicTable";
import {Container} from "@mui/material";

const Dashboard = () => {
    return (
        <div>
            <div>
                <Container maxWidth={'lg'}>
                    <h3>Derniers partenaires ajouté</h3>
                    <BasicTable />
                </Container>
            </div>
            <div>
                <Container maxWidth={'lg'}>
                    <h3>Dernières structures ajoutée</h3>
                    <BasicTable />
                </Container>
            </div>
        </div>
    );
};

export default Dashboard;
