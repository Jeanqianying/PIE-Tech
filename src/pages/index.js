import React, { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Footer from '../components/Footer';
import Header from '../components/Header';
import Link from 'next/link';
import BackToTopButton from '@/components/BackToTop';

const inter = Inter({ subsets: ['latin'] })


export default function Home() {

  const [currentStep, setCurrentStep] = useState(1);

  const handleNextClick = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevClick = () => {
    setCurrentStep((prevStep) => prevStep - 1);
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

        <div className={styles.description}>
        <Header/>
 
          <div>
 
  
          </div>
      </div>
        
       
        <div className={styles.hometext}>

        
          <div className={styles.homedesc}>
            <p>PRIVACY </p> 
            <p>INTEROPERABILITY </p>
            <p>EFFICIENCY </p>
            <p>TRUST </p>
            <p>TECHNOLOGY </p>
          </div>

          <div className={styles.homeimage}>
            <Image src="/images/homekey.png" alt="Own Identity Inc Logo" width={400} height={400} />
          </div>
   
        </div>

        <div className={styles.hometext2}>
            <p>A Blockchain-Empowered Digital Identity Platform</p>
          </div>

          <hr style={{
          background: 'white',
          color: 'white',
          borderColor: 'white',
          opacity:'30%',
          height: '2px',
          width:'70%',
          }}/>




<div className={styles.StepperContainer}>
          {/* Vertical Stepper */}
          <div className={styles.verticalStepper}>
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`${styles.stepperItem} ${step === currentStep && styles.activeStep}`}
              >
                {step}
              </div>
            ))}
          </div>

          {/* Content for each step */}
          <div className={styles.stepContent}>

            {currentStep === 1 && <div><p className={styles.stepstitle}>Step 1</p>
            <p className={styles.stepdestitle}>Create a cryptocurrency wallet</p>
            <p className={styles.step1des}>A crypto wallet is your key to entering the world of blockchain. Interactions with the blockchain including digital identity creation, authorizing transactions, 
            sending digital identity to others require your consent through your crypto wallet.</p>
              <p className={styles.createwallet}><a href="https://metamask.io">Create Your Wallet here.          <Image src="/images/shareicon.png" alt="Create wallet" width={20} height={20} />
</a></p></div>}

            {currentStep === 2 && <div><p className={styles.stepstitle}>Step 2</p>
            <p className={styles.stepdestitle}>Connect your cryptocurrency wallet</p>
            <p className={styles.step1des}>Now you have created your wallet, click on the connect wallet button on the upper right corner to begin.</p>
              </div>}

              {currentStep === 3 && <div><p className={styles.stepstitle}>Step 3</p>
            <p className={styles.stepdestitle}>Fill in your KYC data</p>
            <p className={styles.step1des}>To create your digital identity, you have to fill in your identities. Worry not, your identities will be 
            encncrypted before storing on the blockchain.</p>
              </div>}

              {currentStep === 4 && <div><p className={styles.stepstitle}>Step 4</p>
            <p className={styles.stepdestitle}>Sign the transaction</p>
            <p className={styles.step1des}>Upon signing a transaction using your crypto wallet, you are providing explicit consent for your digital identity to be securely stored on the blockchain or transmitted to the 
            designated recipient&apos;s address. This digital signature is your way of authorizing and validating the transfer of information, ensuring that your actions are both secure and under your control.</p>
              </div>}

              {currentStep === 5 && <div><p className={styles.stepstitle}>Step 5</p>
            <p className={styles.stepdestitle}>Done!</p>
            <p className={styles.step1des}>Congratulations! Your digital identity has been created. Each transaction is uniquely identified by its associated transaction hash. To stay updated on your 
            transaction status, go to Check page to simply check if it has been successfully completed.</p>
              </div>}


        

             {/* Navigation buttons */}
             <div className={styles.navigationButtons}>
                {currentStep > 1 && (
                  <button onClick={handlePrevClick} className={styles.prevButton}>
                    Previous
                  </button>
                )}
                {currentStep < 5 && (
                  <button onClick={handleNextClick} className={styles.nextButton}>
                    Next
                  </button>
                )}
              </div>

          </div>
        </div>

       



        <hr style={{
          background: 'white',
          color: 'white',
          borderColor: 'white',
          opacity:'30%',
          height: '2px',
          width:'70%',
          marginTop:'10%',
          }}/>


        <div className={styles.hometitle}>
          <p>How PIE-Tech works?</p>
            <div className={styles.hometitle2}>
              <p>A visual representation to demonstrate how your digital identity is created.</p>
            </div>
        </div>

        
        <div className={styles.homebannerimage}>
          <Image src="/images/homeimage.png" alt="Own Identity Inc Logo" width={800} height={500} />
        </div>

         


     
      
        <BackToTopButton />

        <br/> <br/> <br/>


        <div className={styles.Footer}>
          <div>
          <Footer/>
          </div>
    
          
         
        </div>
        
      </main>

     
    </>
  )
}
