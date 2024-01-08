import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from '@/styles/Home.module.css'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import Web3 from 'web3';
import { ContractAbi } from 'web3';
import CryptoJS from 'crypto-js';
import BackToTopButton from '@/components/BackToTop';


const inter = Inter({ subsets: ['latin'] })

//Smart Contract Starts Here
//Smart Contract Application Binary Interface (ABI)
const ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "allowance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientAllowance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSpender",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_encryptedData",
				"type": "string"
			}
		],
		"name": "storeUserData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "getUserData",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userDataMap",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

//Smart Contract Address (Deployed)
const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';



//Function to validate email format
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

//Function to pop up message after token is created
function showCustomModal() {

	const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; 

  document.body.appendChild(overlay);

	const modal = document.createElement('div');
	modal.style.position = 'fixed';
	modal.style.top = '50%';
	modal.style.left = '50%';
	modal.style.transform = 'translate(-50%, -50%)';
	modal.style.backgroundColor = 'black';
	modal.style.height = '500px'
	modal.style.width = '400px'
	modal.style.padding = '20px';
	modal.style.zIndex = 1000;
	modal.style.borderRadius = '10px';
	modal.style.border = '3px solid white'
	modal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
	modal.style.textAlign = 'center'; 
	
	const image = document.createElement('img');
	image.src = '/images/slowloadeffect.gif'; 
	image.alt = 'Token Image';
	image.style.width = '100px'; 
	image.style.paddingTop = '10%';
	modal.appendChild(image);

	const title = document.createElement('h2');
	title.innerText = 'Token is Created';
	title.style.fontFamily = 'sans-serif';
	title.style.lineHeight = '3.5';
	title.style.textAlign = 'center'; 
	modal.appendChild(title);
	
  
	const message = document.createElement('p');
	message.innerText = 'Your token has been successfully created.';
	message.style.fontFamily = 'sans-serif';
	message.style.lineHeight = '3.5';
	message.style.textAlign = 'center'; 
	modal.appendChild(message);
  
	const closeButton = document.createElement('button');
	closeButton.innerText = '×'; 
	closeButton.style.fontFamily = 'sans-serif';
	closeButton.style.lineHeight = '1.5';
	closeButton.style.position = 'absolute'; 
	closeButton.style.top = '10px'; 
	closeButton.style.right = '20px';
	closeButton.style.background = 'transparent';  //button bg transparent
	closeButton.style.border = 'none'; 
	closeButton.style.color = 'white'; 
	closeButton.style.fontSize = '24px'; 
	closeButton.style.cursor = 'pointer';
	closeButton.onclick = function () {
		modal.remove();
		overlay.remove();

	};
	modal.appendChild(closeButton);

	const CheckStatusButton = document.createElement('a');
	CheckStatusButton.innerText = 'Check Token Status'; 
	CheckStatusButton.href = '/CheckStatus'; //go to check status page
	CheckStatusButton.target = '_blank'; 
	CheckStatusButton.style.display = 'block'; 
	CheckStatusButton.style.marginTop = '20px'; 
	CheckStatusButton.style.margin = '20px auto'; // Center horizontally
	CheckStatusButton.style.fontFamily = 'sans-serif';
	CheckStatusButton.style.fontWeight = '550';
	CheckStatusButton.style.color = 'white';
	CheckStatusButton.style.backgroundColor = '#206fe6'; 
	CheckStatusButton.style.border = 'none';
	CheckStatusButton.style.borderRadius = '10px'; 
	CheckStatusButton.style.padding = '10px 20px'; 
	CheckStatusButton.style.textDecoration = 'none'; 
	CheckStatusButton.style.cursor = 'pointer'; 
	CheckStatusButton.style.width = '200px';
	CheckStatusButton.style.textAlign = 'center'; 

	
	modal.appendChild(CheckStatusButton);


	document.body.appendChild(modal);
  }


//main function
export default function Start() {
	
	//const [isTokenCreatedModalOpen, setIsTokenCreatedModalOpen] = useState(false);

	
	const [errors, setErrors] = useState({
		email: "",
		age: "", 
		address: "", 
		identificationType: "", 
		icNumber: "", 
		passportNumber: "", 
		phone: "", 
		employmentStatus: "" 
	});
	

	const renderErrorMessage = (fieldName) => {
		return errors[fieldName] && (
		<div style={{ color: 'red', marginTop: '5px' }}>
			{errors[fieldName]}
		</div>
		);
	};

	// Function to handle incrementing the age
	const handleIncrementAge = () => {
		setFormData((prevState) => ({
		...prevState,
		age: String(parseInt(prevState.age, 10) + 1),
		}));
	};

	// Function to handle decrementing the age
	const handleDecrementAge = () => {
		setFormData((prevState) => ({
		...prevState,
		age: String(parseInt(prevState.age, 10) - 1),
		}));
	};

  const validateForm = () => {
    let isValid = true;
    let newErrors = { email: "", age: "", formaddress: "", identificationType: "", icNumber: "", passportNumber: "", phone: "", employmentStatus: "" };

    // Email validation
    if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }


    // Age validation
    if (!isValidAge(formData.age)) {
      newErrors.age = 'Please enter a valid age (numeric characters only).';
      isValid = false;
    }

    // Address validation
    if (!isValidAddress(formData.formaddress)) {
      newErrors.formaddress = 'Please enter a valid address (alphanumeric and symbols allowed).';
      isValid = false;
    }



    // Identification type validation
    if (!isValidIdentificationType(formData.identificationType)) {
      newErrors.identificationType = 'Please select a valid identification type (IC or passport).';
      isValid = false;
    }

    // IC number validation
    /* if (formData.identificationType === "IC" && !isValidICNumber(formData.icNumber)) {
      newErrors.icNumber = 'Please enter a valid IC number (numeric characters and dashes allowed).';
      isValid = false;
    } */


	//IC validation
const isValidICNumber = (icNumber) => {
	const pattern = /^\d{12}$/; // Ensure exactly 12 numeri
	return pattern.test(icNumber) && icNumber.length === 12;
  };
  

//Passport validation
  const isValidPassportNumber = (passportNumber) => {
	const pattern = /^[a-zA-Z0-9\-]+$/;
	return pattern.test(passportNumber) && passportNumber.length === 10;
  };
  

    // Phone validation
    if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (numeric characters, plus, and minus signs allowed).';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    formaddress: "",
    age: "", 
    identificationType: "", 
    icNumber: "", 
    passportNumber: "", 
    phone: "", 
   //employmentStatus: "",
  });

  const [focus, setFocus] = useState({
    name: false,
    email: false,
    address: false,
    age: false, 
    identificationType: false, 
    icNumber: false, 
    passportNumber: false, 
    phone: false, 
    //employmentStatus: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFocus = (name) => {
    setFocus(prevState => ({
      ...prevState,
      [name]: true
    }));
  };

  const handleBlur = (name) => {
    setFocus(prevState => ({
      ...prevState,
      [name]: false
    }));
  };

  const isValidAge = (age) => {
    const pattern = /^\d+$/;
    return pattern.test(age);
  };

  const isValidFormAddress = (formaddress) => {
    const pattern = /^[a-zA-Z0-9\s\-\,\.]+$/;
    return pattern.test(formaddress);
  };

  const isValidICNumber = (icNumber) => {
    const pattern = /^[\d\-]+$/;
    return pattern.test(icNumber);
  };

  const isValidPassportNumber = (passportNumber) => {
    const pattern = /^[a-zA-Z0-9\-]+$/;
    return pattern.test(passportNumber);
  };

  const isValidPhone = (phone) => {
    const pattern = /^[\d\+\-\s]+$/;
    return pattern.test(phone);
  };

  // Validation function for identification type
  const isValidIdentificationType = (identificationType) => {
    return identificationType === "IC" || identificationType === "passport";
  };



  const generateKeyPair = () => {
	// Generate private key (256 bits)
	const privateKey = CryptoJS.lib.WordArray.random(32);
  
	// Derive the public key from the private key
	const publicKey = CryptoJS.SHA256(privateKey).toString();
  
	return {
	  privateKey: privateKey.toString(CryptoJS.enc.Hex),
	  publicKey: publicKey.substring(0, 64), // Take the first 64 characters as the public key
	};
  };
  
  // Add state to store the generated keys
const [generatedKeys, setGeneratedKeys] = useState({
	privateKey: '',
	publicKey: '',
  });
  
  // ...
  
  // Function to handle generating keys
  //const handleGenerateKeys = () => {
	
  //};

  // Add state to store user input for encryption and encrypted data
const [encryptedData, setEncryptedData] = useState('');

// Function to handle encryption
const handleEncrypt = () => {
	if (!formData.formaddress) {
	  alert('Provide your KYC data first.');
	  return;
	}

	const keys = generateKeyPair();
	setGeneratedKeys(keys);
  
	try {
	  // Convert public key to Word Array
	  const publicKey = CryptoJS.enc.Hex.parse(generatedKeys.publicKey);
  
	  // Convert user input data to Word Array
	  const data = CryptoJS.enc.Utf8.parse(formData);
  
	  // Encrypt the data using the public key
	  const encrypted = CryptoJS.AES.encrypt(data, publicKey, { mode: CryptoJS.mode.ECB });
  
	  // Set the encrypted data in the state
	  setEncryptedData(encrypted.toString());
	} catch (error) {
	  console.error('Encryption error:', error);
	  alert('Encryption failed. Please try again.');
	}
  };

  //Connect Smart Contract
async function connectToSmartContract() {
	if (window.ethereum) {
	  try {
		const web3 = new Web3(window.ethereum);
		await window.ethereum.enable(); // Request user's permission to connect
  
		const contract = new web3.eth.Contract(ABI, contractAddress);
		const accounts = await web3.eth.getAccounts();
  
		console.log('Connected to Ethereum:', accounts[0]);
		console.log('Connected to Smart Contract:', contract.options.address);
  
		contract.methods.storeUserData(
			encryptedData
		).send({ from: accounts[0] });

		

	  } catch (error) {
		console.error('Error connecting to Ethereum:', error);
	  }
	} else {
	  console.error('Ethereum not found. Please install MetaMask or use a compatible browser.');
	}
  }

  const handleSubmit = async (e) => {
	e.preventDefault();


    try {
      const web3 = new Web3(window.ethereum);
	  await window.ethereum.enable(); // Request user's permission to connect
	  const accounts = await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(ABI, contractAddress);

      const user = accounts[0];

	  console.log(user);
		  
	  console.log('Connecting...');

	  await contract.methods.storeUserData(
		  encryptedData 
	  ).send({ from: user, });

      console.log('Data stored successfully.');

	  showCustomModal();

    } catch (error) {
      console.error('Error storing user data:', error);
    }; 
	

    // Validate  email field
    if (!isValidEmail(formData.email)) {
      alert('Please enter a valid email address.');
      return; // Stop the submission if the email is not valid
    }
    
   
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '95%',
	paddingLeft:'5%',
	zIndex:'0',

  };

  const fieldStyle = {
    position: 'relative',
    marginBottom: '40px',
	zIndex:'0',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '15px',
    outline: 'none',
	zIndex:'-1',
  };

  const labelStyle = (fieldName) => ({
    position: 'absolute',
    left: '15px',
    top: focus[fieldName] || formData[fieldName] ? '-10px' : '50%', 
    transition: 'top 0.3s, font-size 0.3s, color 0.3s, transform 0.3s',
    fontSize: focus[fieldName] || formData[fieldName] ? '16px' : '16px',
    color: focus[fieldName] || formData[fieldName] ? 'white' : '#999',
    padding: '0 2px',
    transform: focus[fieldName] || formData[fieldName] ? 'translateY(-60%)' : 'translateY(-50%)',
	zIndex:'0',

  });

  const keylabelStyle = (fieldName) => ({
    position: 'absolute',
    left: '15px',
    top: focus[fieldName] || formData[fieldName] ? '-10px' : '50%', 
    transition: 'top 0.3s, font-size 0.3s, color 0.3s, transform 0.3s',
    fontSize: focus[fieldName] || formData[fieldName] ? '16px' : '16px',
    color: focus[fieldName] || formData[fieldName] ? 'white' : '#999',
    padding: '0 2px',
    transform: focus[fieldName] || formData[fieldName] ? 'translateY(-60%)' : 'translateY(-50%)',
	zIndex:'0',

  });
  
  
  const publickeylabelStyle = (fieldName) => ({
    position: 'absolute',
    left: '15px',
    top: focus[fieldName] || formData[fieldName] ? '-10px' : '50%', 
    transition: 'top 0.3s, font-size 0.3s, color 0.3s, transform 0.3s',
    fontSize: focus[fieldName] || formData[fieldName] ? '16px' : '16px',
    color: focus[fieldName] || formData[fieldName] ? 'white' : '#999',
    padding: '0 2px',
    transform: focus[fieldName] || formData[fieldName] ? 'translateY(-60%)' : 'translateY(-50%)',
	zIndex:'0',

  });

  const buttonStyle = {
    padding: '10px',
    backgroundColor: '#206fe6',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '10px',
  };

  const generatebuttonStyle = {
    padding: '10px',

    backgroundColor: '#206fe6',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '10px',
  };


 

  return (
    <>
    <Head>
        
        <title>PIE-Tech.</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <main className={`${styles.main} ${inter.className}`}>

	<BackToTopButton />
    <div className={styles.description}>
      <Header/>
   
    </div>

	<br/><br/><br/><br/>


	<div className={styles.FormContainer}>

		<div className={styles.FormBG}>

			<div className={styles.FormTitle1}>
			Get Started <br/>
			
				<div className={styles.FormTitle2}>
					Let&apos;s create your digital identity
				</div>

				<div className={styles.FormTitle3}>
					Step 1
				</div>
			
			</div>

			<div className={styles.FormStyles}>

				<form onSubmit={handleSubmit} style={formStyle}>
				<div className={styles.nameandage}>
					<div className={styles.formname}>

					
						<div style={fieldStyle}>
						<label style={labelStyle('name')} htmlFor="name">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							onFocus={() => handleFocus('name')}
							onBlur={() => handleBlur('name')}
							style={inputStyle}
							required
						/>
						</div>

					</div>

					<div className={styles.formage}>

					
					<div style={fieldStyle}>
						<label style={labelStyle('age')} htmlFor="age">Age</label>
						<div style={{ display: 'flex', alignItems: 'center' }}>
					
							<input
							type="number"
							id="age"
							name="age"
							value={formData.age}
							onChange={handleChange}
							onFocus={() => handleFocus('age')}
							onBlur={() => handleBlur('age')}
							min="0" // Set the minimum age to 0
							style={inputStyle}
							required
							/>
					
						</div>
						{renderErrorMessage('age')} {/* Display error message for age */}
						</div>

						</div>

				</div>
				

				<div>

							<div style={fieldStyle}>
							<label >Identification Type</label>
							<select
								id="identificationType"
								name="identificationType"
								value={formData.identificationType}
								onChange={handleChange}
								onFocus={() => handleFocus('identificationType')}
								onBlur={() => handleBlur('identificationType')}
								style={inputStyle}
								required
							>
								<option value="" disabled>Select Identification Type</option>
								<option value="IC">IC</option>
								<option value="passport">Passport</option>
							</select>
							</div>

							{formData.identificationType === 'IC' && (
							<div style={fieldStyle}>
								<label style={labelStyle('icNumber')} htmlFor="icNumber">IC Number</label>
								<input
								type="text"
								id="icNumber"
								name="icNumber"
								value={formData.icNumber}
								onChange={handleChange}
								onFocus={() => handleFocus('icNumber')}
								onBlur={() => handleBlur('icNumber')}
								style={inputStyle}
								required
								/>
								{renderErrorMessage('icNumber')} {/* Display error message for IC number */}
							</div>
							)}

							{formData.identificationType === 'passport' && (
							<div style={fieldStyle}>
								<label style={labelStyle('passportNumber')} htmlFor="passportNumber">Passport Number</label>
								<input
								type="text"
								id="passportNumber"
								name="passportNumber"
								value={formData.passportNumber}
								onChange={handleChange}
								onFocus={() => handleFocus('passportNumber')}
								onBlur={() => handleBlur('passportNumber')}
								style={inputStyle}
								required
								/>
								{renderErrorMessage('passportNumber')} {/* Display error message for Passport number */}
							</div>
							)}
				
				</div>

			<div className={styles.EmailContact}>

				<div className={styles.EmailStyle}>

				
					<div style={fieldStyle}>
					<label style={labelStyle('email')} htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						onFocus={() => handleFocus('email')}
						onBlur={() => handleBlur('email')}
						style={inputStyle}
						required
					/>
					</div>

				</div>

				<div className={styles.ContactStyle}>

				
					<div style={fieldStyle}>
					<label style={labelStyle('phone')} htmlFor="phone">Contact Number</label>
					<input
						type="phone"
						id="phone"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						onFocus={() => handleFocus('phone')}
						onBlur={() => handleBlur('phone')}
						style={inputStyle}
						required
					/>
					</div>

				</div>

			</div>

				<div style={fieldStyle}>
				<label style={labelStyle('formaddress')} htmlFor="formaddress">Address</label>
				<textarea
					id="formaddress"
					name="formaddress"
					value={formData.formaddress}
					onChange={handleChange}
					onFocus={() => handleFocus('formaddress')}
					onBlur={() => handleBlur('formaddress')}
					style={{...inputStyle, height: '100px'}}
					required
				/>
				</div>
				
			
	
		
	


				
				<div className={styles.Step2BG}>

					{/* Display user the generated keys 
				<div className={styles.Step2StyleTitle1}>
					Step 2
				</div>
				<div style={fieldStyle}>
				<div className={styles.keyfield}>

					<label style={keylabelStyle('privateKey')} htmlFor="privateKey" className={styles.keyfield}>
					Private Key
					</label>
					<input
					type="text"
					id="privateKey"
					name="privateKey"
					value={generatedKeys.privateKey}
					readOnly
					style={inputStyle}
					onChange={handleChange}
					onFocus={() => handleFocus('privateKey')}
					onBlur={handleBlur}
					/>
					</div>
				</div>

				<div className={styles.keyfield}>
				<div style={fieldStyle}>
					<label style={publickeylabelStyle('publicKey')} htmlFor="publicKey">
					Public Key
					</label>
					<input
					type="text"
					id="publicKey"
					name="publicKey"
					value={generatedKeys.publicKey}
					readOnly
					style={inputStyle}
					onChange={handleChange}
					onFocus={() => handleFocus('publicKey')}
					onBlur={handleBlur}
					/>
					</div> 
					</div> 


					<div className={styles.generatekeybutton}>
						<button type="button" onClick={handleGenerateKeys} style={generatebuttonStyle}>
						Generate Key
						</button>
					</div> */}
				
					<div className={styles.Step3Title}>
						Step 2
					</div>

					
				
					<div className={styles.EncryptStyle}>

					<div className={styles.encryptbuttonstyle}>
					<button type="button" onClick={handleEncrypt}  className={styles.Encryptbutton}>
					Encrypt
					</button>
					</div>
					
						<div className={styles.Encryptlabel} style={fieldStyle}>
						<label style={labelStyle('encryptedData')} htmlFor="encryptedData">
							Encrypted Data
						</label>
						<input
							type="text"
							id="encryptedData"
							name="encryptedData"
							value={encryptedData}
							readOnly
							style={inputStyle}
							onChange={handleChange}
							onFocus={() => handleFocus('encryptedData')}
							onBlur={handleBlur}
						/>
					</div>

	

					</div>
					<br/>

					<div className={styles.aftersubmitbutton}>
					<button type="submit" className={styles.submitbuttonstyle}>Submit</button>
					</div>			
				</div>
				</form>
			</div>

			</div>
		</div>

		<br/><br/><br/><br/><br/><br/><br/><br/>

    	<div className={styles.Footer}>
          <div>
          <Footer/>
          </div>
        </div>

    </main>
    </>
  );
}
