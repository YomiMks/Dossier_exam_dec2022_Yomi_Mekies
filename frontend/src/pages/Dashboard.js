import React from 'react';
import BasicTable from "../components/dataDisplay/BasicTable";
import {Container} from "@mui/material";

const Dashboard = (props) => {
    const { partnersData, structuresData } = props;
    const cellPartners = [{
        id: 1,
        cell: 'Nom',
        slug: 'name'
    },
        {
            id: 2,
            cell: 'Ville',
            slug: 'city'
        },
    ]
    const cellStructures = [{
        id: 1,
        cell: 'Adresse'
    }, {id: 2, cell: 'Nom'}, {id: 3, cell: 'Description'}]
    return (
        <div>
            <div>
                <Container maxWidth={'lg'}>
                    <h3>Derniers partenaires ajouté</h3>
                    <BasicTable cell={cellPartners} data={partnersData}/>
                </Container>
            </div>

            <div>
                <Container maxWidth={'lg'}>
                    <h3>Dernières structures ajoutée</h3>
                    <BasicTable cell={cellStructures} data={structuresData} structure={true}/>
                </Container>
            </div>
        </div>
    );
};

export default Dashboard;
