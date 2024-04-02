// Trong file _document.tsx hoặc một component cụ thể

import Script from 'next/script';
import React from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'df-messenger': any;
        }
    }
}

const DialogflowMessenger = () => {
    return (
        <>
            <Script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1" strategy="lazyOnload" />
            <df-messenger
                intent="WELCOME"
                chat-title="TNC"
                agent-id="1fb77667-fc44-4b31-b3b7-6a28b4f623f0"
                language-code="vi"
            ></df-messenger>
        </>
    );
};

export default DialogflowMessenger;
