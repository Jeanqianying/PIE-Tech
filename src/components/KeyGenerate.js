import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const KeyGenerator = ({ onKeysGenerated }) => {
  const [privateKey, setPrivateKey] = useState(null);

  const generateKeys = () => {
    // Generate private and public keys
    const { privateKey, publicKey } = generateKeysFunction();
    setPrivateKey(privateKey);

    // Optionally, notify the parent component about the generated keys
    onKeysGenerated({ privateKey, publicKey });
  };

  // Function to generate private and public keys
  const generateKeysFunction = () => {
    const privateKey = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
    const publicKey = CryptoJS.SHA256(privateKey).toString(CryptoJS.enc.Hex);
    return { privateKey, publicKey };
  };

  const buttonStyle = {
    padding: '10px',
    backgroundColor: '#206fe6',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '10px',
    width:'500px',
  };


  return (
    <div>
      <button type="button" onClick={generateKeys} style={submitbuttonStyle}>
        Generate Keys
      </button>
      {privateKey && (
        <div>
        </div>
      )}
    </div>
  );
};

export default KeyGenerator;
