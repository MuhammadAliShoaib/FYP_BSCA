import React from 'react'
import Box from '@mui/material/Box';

type Props = {
    title : string
}

export default function Header({title}:Props) {
    return (
        <Box sx={{ padding: '10px 20px 10px 20px', display: 'flex', justifyContent: 'start', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="">
                    <p
                        style={{
                            fontFamily: "Poppins",
                            fontWeight: 600,
                            fontSize: 20
                        }}
                    >
                        {title}
                    </p>
                </div>
            </Box>
            {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '15px', border: '1px solid black', marginRight: '10px' }}>

                        </div>
                        Muhammad Ali
                    </div> */}
        </Box>
    )
}
