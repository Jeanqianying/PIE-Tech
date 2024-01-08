import React from 'react';
import Image from 'next/image';
import styles from '@/styles/Home.module.css'
import { useState } from 'react';
import { useRef } from 'react';
import Link from 'next/link';

const Footer = () => {

    const [tooltipText, setTooltipText] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  
    const showTooltip = (e, text) => {
      const iconRect = e.target.getBoundingClientRect();
      setTooltipText(text);
      setTooltipPosition({
        top: iconRect.bottom + window.scrollY + 10, 
        left: iconRect.left + iconRect.width / 2 + window.scrollX
      });
    };
  
    const hideTooltip = () => {
      setTooltipText('');
    };


    return (
    <div className={styles.footerContainer}>

  
    <div className={styles.footer}>
       <div className={styles.footerlogo}>

            <div className={styles.FooterlogoImage}>
            <Link href="/">
                <Image src="/images/logo.png" alt="Own Identity Inc Logo" width={75} height={75} />
            </Link>
            </div>

            <div className={styles.FooterlogoText}>
                <h2>PIE-Tech</h2>
                <h5>Privacy. Interoperability. Efficiency. Trust. Technology</h5>
                
            </div>

            <div className={styles.FooterBlock}>
                <p>Block Explorer</p>
                <a href="https://etherscan.io"><h6>Etherscan</h6></a>
                <a href="https://sepolia.etherscan.io"><h6>Sepolia</h6></a>
                <a href="https://polygonscan.com"><h6>PolygonScan</h6></a>
                <a href="https://arbiscan.io"><h6>Arbiscan</h6></a>
            </div>

            <div className={styles.FooterResources}>
                <p>Digital Identity</p>
                <Link href="/Start"><h6>Create</h6></Link>
                <Link href="/CheckStatus"><h6>Check Status</h6></Link>
                <Link href="/History"><h6>History</h6></Link>
            </div>

            <div className={styles.FooterGeneral}>
                <p>General</p>
                <Link href="/About"><h6>About Us</h6></Link>
                <Link href="/ContactUs"><h6>Contact Us</h6></Link>
            </div>
      
        

        </div> 
       
 

    
    </div>  
    <br/>

    <div className={styles.FooterMediaLogos}>
        <a href="https://github.com/Jeanqianying" onMouseEnter={(e) => showTooltip(e, 'GitHub')} onMouseLeave={hideTooltip} >
            <Image src="/images/githubicon.png" alt="Own Identity Inc Logo" width={35} height={35} />
        </a>

        <a href="https://wa.me/+60126069288"  onMouseEnter={(e) => showTooltip(e, 'WhatsApp')} onMouseLeave={hideTooltip} >
            <Image src="/images/whatsapp.png" alt="Own Identity Inc Logo" width={35} height={35} />
        </a>

        <a href="https://www.linkedin.com/in/tiew-jean-eing/" onMouseEnter={(e) => showTooltip(e, 'Linked In')} onMouseLeave={hideTooltip} >
            <Image src="/images/linkedin.png" alt="Own Identity Inc Logo" width={35} height={35} />
        </a>

        <a href="https://twitter.com/EingJean" onMouseEnter={(e) => showTooltip(e, 'Twitter')} onMouseLeave={hideTooltip} >
            <Image src="/images/twitter.png" alt="Own Identity Inc Logo" width={35} height={35} />
        </a>

        <a href="mailto:tp061775@mail.apu.edu.my" onMouseEnter={(e) => showTooltip(e, 'Email')} onMouseLeave={hideTooltip} >
            <Image src="/images/email.png" alt="Own Identity Inc Logo" width={35} height={35} />
        </a>

    </div>

    {tooltipText && (
        <div
          className={styles.customTooltip}
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            transform: 'translateX(-50%)',
            position: 'absolute',
          }}
        >
          {tooltipText}
        </div>
      )}
    </div>
  );
};




export default Footer;
