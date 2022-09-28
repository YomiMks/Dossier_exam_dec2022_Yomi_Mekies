import React, { useState } from 'react';

import EnhancedTable from "../components/dataDisplay/EnhancedTable";
import { Container } from "@mui/material";
import Modal from "../components/utils/modal";
// parent
const Partners = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Container maxWidth={'lg'}>
                {/* child component  */}
                <EnhancedTable handleOpen={handleOpen} />
            </Container>
            <Modal open={open} setOpen={setOpen} handleClose={handleClose} handleOpen={handleOpen} />
        </div>
    )
}

export default Partners;
