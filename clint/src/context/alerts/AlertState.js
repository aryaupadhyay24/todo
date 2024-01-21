import React, { useState } from 'react';
import AlertContext from './alertContest';

const AlertState = (props) => {
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type)=>{
        setAlert({
          msg: message,
          type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    }

    return (
    <AlertContext.Provider value = {{showAlert,alert}}>
        {props.children}
    </AlertContext.Provider>
    );
}

export default AlertState;