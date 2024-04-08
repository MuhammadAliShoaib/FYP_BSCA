import React from 'react'
import BatchTable from '../../components/BatchTable'
import Header from '../../components/Header'
import { Container, Grid } from '@mui/material'
import { BatchProgress } from '../../components/batchProgress'

export default function Batches() {
    return (
        <>
            <Header title="Batches" />
            <Container style={{ marginTop: '50px', }}>
                <Grid container>
                    <Grid item md={12}>
                        <BatchTable />
                        <BatchProgress/>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
