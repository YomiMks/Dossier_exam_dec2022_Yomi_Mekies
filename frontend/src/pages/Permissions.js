import DataGrid from '../components/dataDisplay/DataGrid';
import {Container} from "@mui/material";
const Permissions = (props) => {
    const {permissionsData} = props
    return (
        <div>
            <Container maxWidth={'lg'}>
                <DataGrid permissionsData={permissionsData}/>
            </Container>
        </div>
    )
}

export default Permissions;
