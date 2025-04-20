import React from 'react'
import '@/app/styles/title.css'

type Props = {
    title: string | React.ReactNode,
    children: React.ReactNode,
    titleClass?: string,
    containerStyle?: React.CSSProperties,
    width?: number,
    onClick?: () => void
}

const Title: React.FC<Props> = ({ title, titleClass = '', containerStyle = {}, onClick = () => { }, children }) => {
    return (
        <div className='title-container'>
            <div className={'main-title-node-container ' + titleClass}>
                {title}
                <div className='title-arrow'></div>
            </div>
            <div onClick={onClick} style={{ cursor: 'pointer', ...containerStyle }}>
                {children}
            </div>
        </div>
    )
}

export default Title