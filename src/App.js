import React, { useState } from "react";
import  './styles.css'
import { FrontPage } from './Frontend.js'
import { ContentPage } from './ContentPage.js'


function MainPage() {

    const [prompts, setPrompts] = useState([]);
    const [urlMap, setUrlMap] = useState(new Map([]));
    const [isImageUploaded, setIsImageUploaded] = useState(false);


    const successfulUpload = (data) => {
        setPrompts(data.questions);
        setUrlMap(new Map(Object.entries(data.urlMap)));
        setIsImageUploaded(true);
    }


    return (
        <>
            <FrontPage handleSuccessfulUpload={successfulUpload} />
            {isImageUploaded && <ContentPage handleSuccessfulUpload={successfulUpload} prompts={prompts} urlMap={urlMap}/>}
        </>
    );
}

export default MainPage;



