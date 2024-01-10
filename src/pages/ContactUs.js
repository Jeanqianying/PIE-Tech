import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '@/styles/Home.module.css';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import Image from 'next/image';
//import MapContainer from '../components/Map';
//<MapContainer address={formData.formaddress} />

const inter = Inter({ subsets: ['latin'] });


  
export default function ContacUs() {

  //Send Email Pop Up
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const emailBody = `${formData.ContactMessage}`;

    const mailtoLink = `mailto:tp061775@mail.apu.edu.my?subject=New%20Contact%20Form%20Submission&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoLink;

    setFormData({
      ContactMessage: "",
    });

    console.log("Form submitted successfully!");
  };
  



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


  
  
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        margin: '0 auto'
      };
    
      const fieldStyle = {
        position: 'relative',
        marginBottom: '50px',
        width:'90%',
        display:'flex',
      
      };
    
      const inputStyle = {
        width: '75%',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '15px',
        outline: 'none',
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
        zIndex: 10,
    
      });
    
      const [focus, setFocus] = useState({
        name: false,
        email: false,
        address: false,
        age: false, // New field
        identificationType: false, 
        icNumber: false, 
        passportNumber: false, 
        phone: false, 
        employmentStatus: false 
      });
    
      const [formData, setFormData] = useState({
   
        ContactMessage: "",
       
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
    




  return (
    <>
      <Head>
    
      </Head>

      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <Header />
        
        </div>

        <div className={styles.ContactContainer}>
        <div className={styles.ContactFormBG}>

          <div className={styles.ContactFormTitle}>
            Contact Us <br/>
          </div>

            <div className={styles.ContactFormStyles}>
              <form onSubmit={handleSubmit} style={formStyle}>
                <div className={styles.SendAddress}>
                  <div style={fieldStyle}>
                    <label style={labelStyle('ContactMessage')} htmlFor="name">Drop your message.</label>
                      <input
                        type="text"
                        id="ContactMessage"
                        name="ContactMessage"
                        value={formData.ContactMessage}
                        onChange={handleChange}
                        onFocus={() => handleFocus('ContactMessage')}
                        onBlur={() => handleBlur('ContactMessage')}
                        style={inputStyle}
                        required
                      />

              <div className={styles.querybutton}>
                  <button type="submit" style={{ width: '200%', padding: '10px', fontSize: '16px',borderRadius: '15px', backgroundColor: '#206fe6' }}>
                    <p style={{fontWeight:'600'}}>Submit
                      </p>
                  </button>
                </div>
                      

                </div>

            
      

                    <p>Social Medias</p>
                </div>

                <div className={styles.ContactMediaLogo}>
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

                <div className={styles.ContactAddress}>
                    <p>Address</p>

                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.146607574819!2d101.69798647430144!3d3.055411053723119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4abb795025d9%3A0x1c37182a714ba968!2sAsia%20Pacific%20University%20of%20Technology%20%26%20Innovation%20(APU)!5e0!3m2!1sen!2smy!4v1703818392269!5m2!1sen!2smy"
                      width="800"
                      height="350"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
   
                    

                </div>

              
              
              </form>

    
          
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
