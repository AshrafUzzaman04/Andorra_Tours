import { React, useEffect, useState } from "react";
import callFetch from "../../helpers/callFetch";
function LastMessage(props) {
    const [message, setMessage] = useState('');
    useEffect(() => {
        callFetch("chat/last-message/"+props.userId, "GET", []).then((res) => {
            // console.log(res.lastMessage);
          setMessage(res?.lastMessage);
        });
        }, [props?.userId]);
  return (
    <div>{message}</div>
  )
}

export default LastMessage