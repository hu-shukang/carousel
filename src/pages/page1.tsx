import { useCallback, useMemo, useState } from 'react';
import { carouselList } from '@/types/carousel.type';

const Page1 = () => {
  const [status, setStatus] = useState(['open', 'close', 'close', 'close', 'close', 'close', 'close']);

  const offsets = useMemo(() => {
    const arr = Array(status.length).fill(0);
    let offset = 0;
    for (let i = 0; i < status.length; i++) {
      if (status[i] === 'close') {
        arr[i] = offset++;
      }
    }
    return arr;
  }, [status]);

  const slide = useCallback((to: 1 | -1) => {
    setStatus(prev => {
      const newStatus = [...prev];
      const openCount = prev.filter(s => s === 'open').length;
      if (to === -1) {
        if (openCount > 1) {
          newStatus[newStatus.lastIndexOf('open')] = 'close';
        }
      } else {
        if (openCount < prev.length) {
          newStatus[newStatus.indexOf('close')] = 'open';
        }
      }
      return newStatus;
    });
  }, []);

  return (
    <>
      <div className="carousel-wrapper">
        {carouselList.map((item, index) => (
          <div
            key={item.id}
            className={`carousel-item ${status[index]}`}
            style={{ '--i': index, '--offset': offsets[index] }}
          >
            <img src={item.image} alt="" />
            <div className="text name">{item.name}</div>
            <div className="text desc">{item.desc}</div>
          </div>
        ))}
        <div className="controls">
          <button className="left" onClick={() => slide(-1)}>
            <img src="/images/left.svg" alt="" />
          </button>
          <button className="right" onClick={() => slide(1)}>
            <img src="/images/right.svg" alt="" />
          </button>
        </div>
        <div className="process-line" style={{ '--percent': status.filter(s => s === 'open').length / status.length }}>
          <div className="process"></div>
        </div>
      </div>
    </>
  );
};

export default Page1;
