import React from 'react';
import Image from 'next/image';
import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => (
    <div className={styles.headerContainer}>


            <div className={styles.logoImage}>
                    <Link href="/" className={styles.logoImage}>
                            <Image src="/images/logo.png" alt="Own Identity Inc Logo" width={80} height={80} />
                    </Link>
        
            </div> 
       
            <div className={styles.logoText}>
                <Link href="/" className={styles.logoText}>
                    <h2>PIE-Tech</h2>       
                </Link>
            </div>

            <div className={styles.HeaderAbout}>
                <Link href="/About" className={styles.HeaderAbout}>
                    <h2>About</h2>       
                </Link>
            </div>

            <div className={styles.HeaderStart}>
                <Link href="/Start" className={styles.HeaderStart}>
                    <h2>Start</h2>       
                </Link>
            </div>

            <div className={styles.HeaderCheck}>
                <Link href="/CheckStatus" className={styles.HeaderCheck}>
                    <h2>Status</h2>       
                </Link>
            </div>

            <div className={styles.HeaderHistory}>
                <Link href="/History" className={styles.HeaderHistory}>
                    <h2>History</h2>       
                </Link>
            </div>

            <div className={styles.headConnect}>
                <ConnectButton />
            </div>

    </div>

);



export default Header;
