import React from 'react'
import Cross from "../Icons/cross";
import "@/app/styles/model.css"

function Model({ onClose, style, className, children }: { onClose: () => void, style?: React.CSSProperties, className?: string, children: React.ReactNode }) {
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