import React from "react";
import Style from "./Notification.module.css"

const Notification = ({setNotification, notification}) => {
  return (
    <div className={Style.alert}>
      {notification}
      <span className={Style.closeBtn} onClick={() => setNotification("")}>&times;</span>
    </div>
  );
};

export default Notification;
