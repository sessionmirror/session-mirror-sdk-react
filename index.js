import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const event = new CustomEvent('session-mirror-page-change');

export const sessionMirror = (id) => {
    const { listen } = useHistory();

    const trackingCode = (sessionMirrorId) => {
        if (window.sessionMirror) {
            return;
        }
        const kv = (k,v) => {
            window.sessionRecorder[k] = v
        };
        window.sessionRecorder = window.sessionRecorder || {};
        window.sessionMirror = window.sessionMirror || kv;

        const a = document.createElement("script");
        a.type = "text/javascript";
        a.async = true;
        a.src = "//client.sessionmirror.com/recorder.js";
        document.getElementsByTagName("head")[0].appendChild(a);

        window.sessionMirror("id", sessionMirrorId);
    };

    useEffect(() => {
        const unlisten = listen((location) => {
            event.detail.path = location.pathname;
            window.dispatchEvent(event);
        });
        trackingCode(id);
        return unlisten
    }, [id, listen]);
};
