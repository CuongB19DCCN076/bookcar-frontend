"use client"
import NotificationModal from '@/components/notification-modal';
import PreviewModal from '@/components/preview-modal';
import React, { useEffect, useState } from 'react'

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, [])
    if (!isMounted) {
        return null;
    }
    return (
        <>
            <PreviewModal />
            <NotificationModal />
        </>
    )
}

export default ModalProvider;