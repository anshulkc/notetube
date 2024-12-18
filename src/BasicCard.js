import React, { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    CardHeader,
    sizing
} from '@mui/material';
import styles from './styles.js';

function BasicCard() {
    return (
        <div style= {{
            display: 'flex',
            justifyContent: 'center',
            height: '99vh',
            paddingTop: '30px',

        }}>
        <Card sx={{ // sx allows for defining custom style that has access to the theme
            boxShadow: 3,
            borderRadius: 2,
            width: '97%',
            height: '60vh',
            
            ':hover': {
                boxShadow: 6,
                transform: 'scale(1.02)',
                transition: 'all 0.1s ease-in-out'
            }
             
             }}>
            <CardHeader 
            title="Can you draw that?"
            subheader="Let's see if an LLM can figure out what you are drawing :)"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    The content of the card goes here
                </Typography>
                </CardContent>
        </Card>
        </div>
    );
}

export default BasicCard;