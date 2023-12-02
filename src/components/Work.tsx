import React from 'react'

type Props = {
    image: string
}

export default function Work({ image }: Props) {
    return (
        <div style={{ position: 'relative', boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",backgroundColor:'white',textAlign:'center',padding:'10px',borderRadius:'10px' }}>
            <div style={{ backgroundColor: 'white', width: '70px', height: '70px', borderRadius: '35px', position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '25px', border: "3px solid #71A5DE", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>1</h2>
                </div>
            </div>
            <img src={image} style={{ height: '70%', width: "70%", marginTop: '20px' }} />
            <p className='mt-3'>Register</p>
            <p style={{ paddingLeft: '10px', paddingRight: '10px' }}>The first thing you must do is register on
                our platform, providing the necessary
                information.</p>
        </div>
    )
}
