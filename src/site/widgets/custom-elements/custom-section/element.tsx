import React, { type FC, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import styles from './element.module.css';

interface Props {
  displayName?: string;
  cardTitle1?: string; cardDesc1?: string;
  cardTitle2?: string; cardDesc2?: string;
  cardTitle3?: string; cardDesc3?: string;
  cardTitle4?: string; cardDesc4?: string;
  cardColor?: string;
  titleColor?: string;
}

const CustomElement: FC<Props> = (props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Sync dots when user swipes manually
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Using a more precise index calculation for mobile
      const index = Math.round(scrollLeft / clientWidth);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  };

  // Scroll to card when dot is clicked
  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left: index * clientWidth,
        behavior: 'smooth',
      });
      setActiveIndex(index);
    }
  };

  // Keep logic-based styles here, let CSS handle the rest
  const cardStyle = { 
    backgroundColor: props.cardColor || '#f8f5f0',
    borderRadius: '10px' // Your requested radius
  };
  
  const mainTitleStyle = { color: props.titleColor || '#0E1C2F' };

   const cardsData = [
    { img: "https://static.wixstatic.com/media/f54d0c_7438c93c424c41bfbe90f7db33da0da7~mv2.png", title: props.cardTitle1 || 'Clear From Day One', desc: props.cardDesc1 || "Everything is laid out from the start. You know exactly what is included in your tier. What you are paying for, and how the process works. No hidden fees. No last minute surprises." },
    { img: "https://static.wixstatic.com/media/f54d0c_8006dd309124484aaa9727d7f12bd6fe~mv2.png", title: props.cardTitle2 || 'Real Experience in Thailand', desc: props.cardDesc2 || "This is not guesswork. We deal with Thailand visas, banking, and local process every day, build on real experience living here. You are not figuring things out as you go." },
    { img: "https://static.wixstatic.com/media/f54d0c_4228c51666c24cd0b6f6fe5f9acd5a90~mv2.png", title: props.cardTitle3 || 'One Person. Start to finish', desc: props.cardDesc3 || "You get one dedicated advisor from day one. Thai and English speaking, guiding you through the entire process from your first call to being fully settled. One point of contact. No confusion." },
    { img: "https://static.wixstatic.com/media/f54d0c_feabc36a06654917b519aa69e3b158fa~mv2.png", title: props.cardTitle4 || 'Fast Start, No Waiting', desc: props.cardDesc4 || "Once you are in, we get moving straight away. Your case starts withing 24 hours of your first consultation, so you are not left waiting around or chasing updates." }
  ];

  return (
    <div className={styles.root}>
      {props.displayName && (
        <h2 className={styles.mainHeading} style={mainTitleStyle}>
          {props.displayName}
        </h2>
      )}
      
      <div className={styles.sliderWrapper}>
        <div 
          className={styles.cardsGrid} 
          ref={scrollRef} 
          onScroll={handleScroll}
        >
          {cardsData.map((card, index) => (
            <div key={index} className={styles.card} style={cardStyle}>
              <img src={card.img} alt={`icon-${index}`} className={styles.cardIcon} />
              <p className={styles.cardTitle}>{card.title}</p>
              <p className={styles.cardDesc}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.dotsContainer}>
          {cardsData.map((_, i) => (
            <button 
              key={i} 
              onClick={() => scrollToIndex(i)}
              className={`${styles.dot} ${activeIndex === i ? styles.activeDot : ''}`}
              aria-label={`Slide to card ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const customElement = reactToWebComponent(
  CustomElement,
  React,
  ReactDOM as any,
  {
    props: [
      "displayName", "cardTitle1", "cardDesc1", "cardTitle2", 
      "cardDesc2", "cardTitle3", "cardDesc3", "cardTitle4", 
      "cardDesc4", "cardColor", "titleColor"
    ]
  }
);

export default customElement;