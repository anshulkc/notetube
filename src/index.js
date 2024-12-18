import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import styles from './styles.js';
import {
    Card,
    CardContent,
    Typography,
    CardHeader
} from '@mui/material';
import DrawThat from './App';


const root = createRoot(document.getElementById('root'));
root.render(<DrawThat />);








