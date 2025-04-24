import React from 'react';

const setCookieWithExpiry = (name, value) => {
    const date = new Date();
    date.setTime(date.getTime() + 3 * 60 * 60 * 1000); // 3 hours in milliseconds
  
    const cookieData = `${name}=${value}; path=/; expires=${date.toUTCString()}; SameSite=Lax; Secure`;
    document.cookie = cookieData;
  
    // console.log(`✅ Cookie set: ${document.cookie}`);
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
    return null; // Return null if the cookie is not found
  };

  const clearCookie = (name) => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure`;
  };

const Cookies = () => {
    return (
        <div>
            
        </div>
    );
};

export {setCookieWithExpiry,getCookie,clearCookie}

export default Cookies;