'use client'
import Arrow from '@/app/Icons/Arrow'
import Cross from '@/app/Icons/cross'
import Image from 'next/image'
import React, { useState } from 'react'

type Props = {
    images: string[]
}

const Gallery = ({ images }: Props) => {
    const [showModel, setShowModel] = useState(false);
    const [currentImg, setCurrentImg] = useState<string>(images[0]);

    return (
        <>
            <h2 style={{ marginBottom: 0, marginTop: '1.5rem', fontFamily: "Raleway, sans-serif", color: 'var(--text-color)' }}>Preview Images</h2>
            <div className="gallery-container">
                {images.map((e, i) => (
                    <Image width='60' height='60' src={e} key={e} onClick={() => { setShowModel(val => !val); setCurrentImg(images[i]) }} alt="Project Preview" className="gallery-project-thumb" />
                ))}
            </div>
            {
                showModel && <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div onClick={() => { setCurrentImg(prevVal => images[(images.indexOf(prevVal) - 1 + images.length) % images.length]) }} className='gallery-model-arrow' style={{ transform: 'translateY(-50%) rotate(-135deg)', left: '1rem' }}><Arrow /></div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '0.7rem' }}>
                        <img src={currentImg} alt="Project Preview" style={{ width: '80%', height: '80vh', objectFit: 'contain' }} />
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {images.map((_, i) => (
                                <div key={i} style={{ height: 10, width: 10, background: images.indexOf(currentImg) === i ? 'gray' : 'var(--text-color)', borderRadius: 10 }}></div>
                            ))}
                        </div>
                    </div>
                    <div onClick={() => { setCurrentImg(prevVal => images[(images.indexOf(prevVal) + 1) % images.length]) }} className='gallery-model-arrow' style={{ transform: 'translateY(-50%) rotate(45deg)', right: '1rem' }}><Arrow /></div>
                    <div onClick={() => setShowModel(val => !val)} style={{ position: 'absolute', top: '1rem', right: '1rem', width: '20px', height: '20px', padding: '1rem', cursor: 'pointer', background: 'var(--container-color)', color: 'var(--text-color)', borderRadius: '0.5rem' }}><Cross /></div>
                </div>
            }
        </>
    )
}

export default Gallery