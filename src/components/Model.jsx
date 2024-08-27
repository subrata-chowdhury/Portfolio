import React from 'react'
import Cross from "../Icons/cross";
import "../style/model.css"

function Model({ onClose, style, className, children }) {
    return (
        <>
            <div className="model-close-btn" onClick={onClose}>
                <Cross />
            </div>
            <div className={"model" + (className ? " " + className : "")} style={style}>
                {children}
            </div>
        </>
    )
}

export default Model