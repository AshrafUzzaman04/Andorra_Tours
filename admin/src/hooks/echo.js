import { useState, useEffect } from "react"
import axios from 'axios';
import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
import callFetch from "helpers/callFetch";
window.Pusher = Pusher;
const useEcho = () =>{
    const [echoInstance, setEchoInstance] = useState(null)
    useEffect(()=>{
        const echo = new Echo({
            broadcaster: 'reverb',
            key: process.env.REACT_APP_REVERB_APP_KEY,
            authorizer: (channel) => {
                return {
                    authorize: (socketId, callback) => {
                        callFetch('broadcasting/auth', {
                            socket_id: socketId,
                            channel_name: channel.name
                        })
                        .then(response => {
                            callback(false, response.data);
                        })
                        .catch(error => {
                            callback(true, error);
                        });
                    }
                };
            },
            wsHost: process.env.REACT_APP_REVERB_HOST,
            wsPort: process.env.REACT_APP_REVERB_PORT ?? 80,
            wssPort: process.env.REACT_APP_REVERB_PORT ?? 443,
            forceTLS: (process.env.REACT_APP_REVERB_SCHEME ?? 'https') === 'https',
            enabledTransports: ['ws', 'wss'],
        });
        setEchoInstance(echo)
    },[])
}
export default useEcho;