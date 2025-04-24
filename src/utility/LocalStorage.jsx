import React from 'react';

const setLocalStorageData = (name, value) => {
    try {
      const dataToStore = typeof value === "string" ? value : JSON.stringify(value);
      localStorage.setItem(name, dataToStore);
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  };

  const removeLocalStorageData = (name) => {
    localStorage.removeItem(`${name}`);
  };
  const getLocalStorageData = (name) => {
    return JSON.parse(localStorage.removeItem(`${name}`) || null);
  };
  
const LocalStorage = () => {
    return (
        <div>
            
        </div>
    );
};

export {setLocalStorageData,removeLocalStorageData,getLocalStorageData};

export default LocalStorage;