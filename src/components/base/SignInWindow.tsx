import { BASE_URL } from '@/lib/service';
import React, { useState, useEffect } from 'react';

interface Props {
  url: string;
  name: string;
  onMessage: (data: string) => void;
  onClose?: (value: boolean) => void; // Optional callback for when the window is closed
}

const SignInWindow: React.FC<Props> = ({ url, name, onMessage, onClose }) => {
  const [windowRef, setWindowRef] = useState<Window | null>(null);

  useEffect(() => {
    const openSignInWindow = () => {
      const strWindowFeatures = 'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';
      const windowObject = window.open(url, name, strWindowFeatures);
      if (windowObject) {
        setWindowRef(windowObject);
      }
    };

    const handleReceiveMessage = (event: MessageEvent) => {
      if (event.origin === BASE_URL) {
        onMessage((event.data).toString());
      }
    };

    const cleanup = () => {
      window.removeEventListener('message', handleReceiveMessage);
      if (windowRef) {
        windowRef.close();
      }
    };

    if (windowRef === null || windowRef.closed) {
      openSignInWindow();
    } else {
      windowRef.focus();
    }

    const checkWindowClosed = setInterval(() => {
      if (windowRef && windowRef.closed) {
        clearInterval(checkWindowClosed);
        if (onClose) {
          onClose(false);
        }
        cleanup();
      }
    }, 1000);

    window.addEventListener('message', handleReceiveMessage);

    return () => {
      clearInterval(checkWindowClosed);
      cleanup();
    };
  }, [url, name, windowRef]);

  return null;
};

export default SignInWindow;
