// FlipCard.js

import React, { useState } from "react";
import styles from '@/styles/Home.module.css'

const FlipCard = ({ word, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`${styles.flipCard} ${isFlipped ? styles.flipped : ""}  gradient-border`} onClick={handleClick}>
      <div className={styles.flipCardInner}>
        <div className={styles.flipCardFront}>
          <h2>{word}</h2>
        </div>
        <div className={styles.flipCardBack}>
          <p>{<h2>{word}</h2>}<br/><br/>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
