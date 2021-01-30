import React from 'react';
import '../styles/adbox.css'

function AdBox(props) {
    return (
        <div className="ad-box">
            {props.children}
        </div>
    )
}

export default AdBox;