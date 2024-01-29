import styles from '@/assets/styles/page2.module.scss';
import { CarouselItemModel, carouselList } from '@/types/carousel.type';
import { useCallback, useEffect, useRef, useState } from 'react';

type CarouselItemProps = {
  index: number;
  item: CarouselItemModel;
  open: boolean;
};

const CarouselItem = ({ index, item, open }: CarouselItemProps) => {
  return (
    <div className={`${styles.item} ${open ? styles.open : ''}`} style={{ '--i': index }}>
      <div className={`${styles.part} ${styles.outter}`}>
        <img src={item.image} alt="" />
      </div>
      <div className={`${styles.part} ${styles.middle}`}>
        <img src={item.image} alt="" />
      </div>
      <div className={`${styles.part} ${styles.inner}`}>
        <img src={item.image} alt="" />
      </div>
    </div>
  );
};

const calcSize = (width: number, height: number) => {
  return Math.sqrt(width * width + height * height);
};

const Page2 = () => {
  const carouselWrapperRef = useRef<HTMLDivElement>(null!);
  const [size, setSize] = useState(calcSize(window.innerWidth, window.innerHeight));
  const [status, setStatus] = useState([true, false, false, false, false, false, false]);

  useEffect(() => {
    const { clientWidth, clientHeight } = carouselWrapperRef.current;
    setSize(() => calcSize(clientWidth, clientHeight));
  }, []);

  const slide = useCallback((to: 1 | -1) => {
    setStatus(prev => {
      const newStatus = [...prev];
      const openCount = prev.filter(s => s === true).length;
      if (to === -1) {
        if (openCount > 1) {
          newStatus[newStatus.lastIndexOf(false)] = true;
        }
      } else {
        if (openCount < prev.length) {
          newStatus[newStatus.indexOf(false)] = true;
        }
      }
      return newStatus;
    });
  }, []);

  return (
    <>
      <div ref={carouselWrapperRef} className={styles.carouselWrapper} style={{ '--size': `${size}px` }}>
        {carouselList.map((item, index) => (
          <CarouselItem key={item.id} index={index} item={item} open={status[index]} />
        ))}
        <div className={styles.controls}>
          <button className="left" onClick={() => slide(-1)}>
            <img src="/images/left.svg" alt="" />
          </button>
          <button className="right" onClick={() => slide(1)}>
            <img src="/images/right.svg" alt="" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Page2;
