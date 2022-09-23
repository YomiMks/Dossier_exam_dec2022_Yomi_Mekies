import React from 'react';
import ResponsiveAppBar from "../components/surface/ResponsiveAppBar";
import BasicTable from "../components/dataDisplay/BasicTable";
import {Container} from "@mui/material";


const Dashboard = () => {
    return (
        <div>
            <ResponsiveAppBar />
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
