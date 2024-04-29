import React from 'react'
import InsightverseLogo from '../assets/InsightverseLogo.png' 

function Logo({ width = '50px' }) {
    return (
        <img src={InsightverseLogo} alt="Logo" width={width} />
    )
}

export default Logo