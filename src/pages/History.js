import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '@/styles/Home.module.css';
import Head from 'next/head';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function History() {
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    fetchTransactionDetails();
  }, []);

  const fetchTransactionDetails = async () => {
    try {
      const response = await axios.get(
        'https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=0xD85aFDE0b0c9ee7324793653fDEebB27Cd73B47D&startblock=0&endblock=99999999&page=1&offset=0&sort=desc&apikey=CK2KX9PGYG3IBNDRX25SEPSKJQSK5KN2MX'
      );

      if (response.data.result && response.data.result.length > 0) {
        const latest5Transactions = response.data.result.slice(0, 5);
        setTransactionData(latest5Transactions);
      }
    } catch (error) {
      console.error('Error fetching transaction details:', error);
    }
  };

  return (
    <>
      <Head></Head>

      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <Header />
          <div></div>
        </div>

        <div className={styles.CheckBlock}>
          <div className={styles.CheckBlockTitle1}>Transaction History</div>
          <div className={styles.CheckBlockTitle2}>
            Track your UDT token creation history.
          </div>

          <div className={styles.CheckContent}>
            {transactionData.map((transaction, index) => (

              <div className={styles.CheckBlockNo} key={index}>
                <div className={styles.CheckBlockNoTitle}>
                    <div className={styles.TransTitle}>
                    <p>Transaction Hash:</p>

                    </div>

                    <div className={styles.CheckBlockNumberField}>
                    <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {transaction.hash}</p>
                    </div>
                </div>

                <div className={styles.CheckBlockNo}>
                  <div className={styles.CheckBlockNoTitle}>
                    <div className={styles.TransTitle}>
                        <p>Block Number:</p>
                    </div>

                  <div className={styles.CheckBlockNumberField}>
                    <p>{parseInt(transaction.blockNumber)}</p>
                  </div>
                </div>
                </div>

                <div className={styles.CheckBlockNo}>
                  <div className={styles.CheckBlockNoTitle}>
                  <div className={styles.TransTitle}>
                    <p>Transaction Status:</p>
                  </div>

                  <div className={styles.CheckBlockNumberField}>
                    <p>
                      {parseInt(transaction.txreceipt_status) === 1
                        ? 'Success'
                        : 'Failure'}
                    </p>
                  </div>
                </div>
                </div>

                <div className={styles.CheckBlockNo}>
                  <div className={styles.CheckBlockNoTitle}>
                  <div className={styles.TransTitle}>
                    <p>Confirmations:</p>
                  </div>
                  
                  <div className={styles.CheckBlockNumberField}>
                    <p>{parseInt(transaction.confirmations)}</p>
                  </div>
                </div>
                </div>

                <div className={styles.CheckBlockNo}>
                  <div className={styles.CheckBlockNoTitle}>
                  <div className={styles.TransTitle}>
                    <p>Input Data:</p>
                  </div>
                  <div className={styles.CheckBlockNumberField}>
                    <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {transaction.input}
                    </p>
                  </div>
                  </div>
                  <div className={styles.Gap}></div>
                </div>
              </div>
            ))}
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
