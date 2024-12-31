import React, { useState } from "react";
import BasicCard from './BasicCard'
import  './styles.css'

function DrawThat() {


    return (
        <div>
            <h1 style= {{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '50px',
                fontSize: '120px'
    
            }}>can you build that?</h1>
            <p style= {{
                display: 'flex',
                justifyContent: 'center',
            }}> let an llm guess what you are drawing </p>
            <BasicCard />
            
        </div>
    );
}

export default DrawThat;



