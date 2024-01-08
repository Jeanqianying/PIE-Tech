import React, { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css'

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Show the button when the user scrolls down
    setIsVisible(scrollY > 200);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button className={styles.backToTopButton} onClick={scrollToTop} style={{ display: isVisible ? 'block' : 'none' }}>
      <img className={styles.arrowImage} src="/images/backtop.png" alt="Back to Top" />
    </button>
  );
};

export default BackToTopButton;
