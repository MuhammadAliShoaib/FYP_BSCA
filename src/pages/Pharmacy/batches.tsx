import React from 'react'
import BatchTable from '../../components/BatchTable'
import Header from '../../components/Header'
import { Container, Grid } from '@mui/material'

export default function Batches() {
    return (
        <>
            <Header title="Batches" />
            <Container style={{ marginTop: '50px', }}>
                <Grid container>
                    <Grid item md={12}>
                        <BatchTable />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
