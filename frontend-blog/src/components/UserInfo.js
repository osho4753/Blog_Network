import React from 'react';

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className="textfield">
      <img className="avatar-url" src={avatarUrl || '/noavatar.png'} alt={fullName} />
      <div className="userDetail">
        <span className="user-name">Ramazan Mamanov</span>
        <span className="textfield">{additionalText}</span>
      </div>
    </div>
  );
};
