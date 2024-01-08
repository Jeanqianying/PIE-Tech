import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '@/styles/Home.module.css';
import Head from 'next/head';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });


export default function Check() {
  const [transHash, setTransHash] = useState(null);
  const [blockNumber, setBlockNumber] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [transactionConfirmations, setTransactionConfirmations] = useState(null);
  const [inputData, setInputData] = useState(null);



  useEffect(() => {
    fetchTransactionDetails();
  },[]);


    
  

  const fetchTransactionDetails = async () => {
    try {

      const hashresponse = await axios.get(
'https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=0xD85aFDE0b0c9ee7324793653fDEebB27Cd73B47D&startblock=0&endblock=99999999&page=1&offset=0&sort=desc&apikey=CK2KX9PGYG3IBNDRX25SEPSKJQSK5KN2MX');
        if (hashresponse.data.result && hashresponse.data.result.length > 0) {
                const transaction = hashresponse.data.result[0];
                
                const transHash = transaction.hash;
                setTransHash(transHash);
              }

      const response = await axios.get(
        'https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=0xD85aFDE0b0c9ee7324793653fDEebB27Cd73B47D&startblock=0&endblock=99999999&page=1&offset=0&sort=desc&apikey=CK2KX9PGYG3IBNDRX25SEPSKJQSK5KN2MX');
        if (response.data.result && response.data.result.length > 0) {
        const transaction = response.data.result[0];
        const blockNumber = parseInt(transaction.blockNumber);
        setBlockNumber(blockNumber);
      }

      

      const receiptResponse = await axios.get(
        'https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=0xD85aFDE0b0c9ee7324793653fDEebB27Cd73B47D&startblock=0&endblock=99999999&page=1&offset=0&sort=desc&apikey=CK2KX9PGYG3IBNDRX25SEPSKJQSK5KN2MX');
        if (receiptResponse.data.result && receiptResponse.data.result.length > 0) {   
        const transaction = receiptResponse.data.result[0];
        const transactionStatus = parseInt(transaction.txreceipt_status);
        setTransactionStatus(transactionStatus);
      }

      const Confirmationresponse = await axios.get(
        'https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=0xD85aFDE0b0c9ee7324793653fDEebB27Cd73B47D&startblock=0&endblock=99999999&page=1&offset=0&sort=desc&apikey=CK2KX9PGYG3IBNDRX25SEPSKJQSK5KN2MX');
        if (Confirmationresponse.data.result && Confirmationresponse.data.result.length > 0) {
        const transaction = Confirmationresponse.data.result[0];
        const transactionConfirmations = parseInt(transaction.confirmations);
        setTransactionConfirmations(transactionConfirmations);
      }


      const inputresponse = await axios.get(
        'https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=0xD85aFDE0b0c9ee7324793653fDEebB27Cd73B47D&startblock=0&endblock=99999999&page=1&offset=0&sort=desc&apikey=CK2KX9PGYG3IBNDRX25SEPSKJQSK5KN2MX');
        if (inputresponse.data.result && inputresponse.data.result.length > 0) {
                const transaction = inputresponse.data.result[0];
                const inputData = transaction.input;
                setInputData(inputData);
              }

    
    } catch (error) {
      console.error('Error fetching transaction details:', error);
    }
  
  };


  return (
    <>
      <Head>
      </Head>

      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <Header />
          <div>
    
          </div>
          
        </div>

        <div className={styles.CheckBlock}>
          <div className={styles.CheckBlockTitle1}>
              Check Status
            </div>
            <div className={styles.CheckBlockTitle2}>
              Check the status of your token.
            </div>

            <div className={styles.CheckContent}>

            <div className={styles.StatusCheckBlockNo}>
                <div className={styles.StatusCheckBlockNoTitle}>
                  <p>Transaction Hash:</p>
                </div>
                  <div className={styles.CheckBlockNumberField}>
                    <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{transHash !== null ? transHash : 'Loading...'}</p>
                  </div>
       
              </div>

            <br/>
              <div className={styles.StatusCheckBlockNo}>
                <div className={styles.StatusCheckBlockNoTitle}>
                  <p>Block Number:</p>
                </div>
                  <div className={styles.CheckBlockNumberField}>
                    <p>{blockNumber !== null ? blockNumber : 'Loading...'}</p>
                  </div>
              </div>

              <br/>
              <div className={styles.StatusCheckBlockNo}>
                <div className={styles.StatusCheckBlockNoTitle}>
                  <p>Transaction Status:</p>
                </div>
                  <div className={styles.CheckBlockNumberField}>
                  <p>{transactionStatus !== null ? (transactionStatus === 1 ? 'Success' : 'Failure') : 'Loading...'}</p>
                  </div>
              </div>

              <br/>
              <div className={styles.StatusCheckBlockNo}>
                <div className={styles.StatusCheckBlockNoTitle}>
                  <p>Confirmations:</p>
                </div>
                  <div className={styles.CheckBlockNumberField}>
                    <p>{transactionConfirmations !== null ? transactionConfirmations : 'Loading...'}</p>
                  </div>
              </div>

              <br/>
              <div className={styles.StatusCheckBlockNo}>
                <div className={styles.StatusCheckBlockNoTitle}>
                  <p>Input Data:</p>
                </div>
                  <div className={styles.CheckBlockNumberField}>
                    <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{inputData !== null ? inputData : 'Loading...'}</p>
                  </div>
              </div>

            </div>
        </div>

        <br /> <br /> <br />

        <div className={styles.Footer}>
          <Footer />
        </div>
      </main>
    </>
  );
}
