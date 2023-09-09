import React from 'react';

export const UserInfo = ({ imageUrl, fullName, additionalText }) => {
  return (
    <div className="textfield">
      <img className="avatar-url" src={imageUrl || '/noavatar.png'} alt={fullName} />
      <div className="userDetail">
        <span className="user-name">{fullName}</span>
        <span className="textfield">{additionalText}</span>
      </div>
    </div>
  );
};
