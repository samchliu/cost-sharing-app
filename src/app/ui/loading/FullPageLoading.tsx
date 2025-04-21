'use client';
//import next or react
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
//import other
import { motion, easeIn } from 'framer-motion';

interface LoadingButtonProps {
  url: string;
  className?: string;
  children?: React.ReactNode;
}

export function LoadingButton({ url, className = '', children }: LoadingButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setTimeout(() => {
      setIsLoading(true);
    }, 300);
    router.push(url, { scroll: true });
  };

  return (
    <>
      {isLoading && <FullPageLoading />}
      <div onClick={handleClick} className={`${className}`}>
        {children}
      </div>
    </>
  );
}

export function FullPageLoading() {
  const [flip, setFlip] = useState(true);
  const [colorIndex, setColorIndex] = useState(0);
  const [frontImageIndex, setFrontImageIndex] = useState(0);
  const [backImageIndex, setBackImageIndex] = useState(0);
  const colors = ['#262525', '#262525', '#262525', '#262525', '#262525'];
  const images = [
    '/images/icons/money.svg',
    '/images/icons/tableware.svg',
    '/images/icons/star.svg',
    '/images/icons/plane.svg',
    '/images/icons/heart.svg',
  ];
  const eased = easeIn(0.3);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlip((prevFlip) => !prevFlip);

      setTimeout(() => {
        setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
        setFrontImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setBackImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 120);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 w-full mix-w-[320px] max-w-[800px]mx-auto">
      <motion.div
        className="flex min-h-screen flex-col items-center justify-center"
        style={{
          backgroundColor: colors[colorIndex],
          transition: 'background-color 0.3s',
        }}
      >
        <motion.div
          style={{ width: '5rem', height: '5rem' }}
          transition={{ duration: 0.3 }}
          animate={{ rotateX: flip ? 0 : 180 }}
          className="relative bottom-8"
        >
          <motion.div
            className="relative h-full w-full"
            transition={{ duration: 0.3 }}
            animate={{ rotateX: flip ? 0 : 180 }}
          >
            <motion.div
              className="absolute h-full w-full backface-hidden"
              style={{
                backgroundImage: `url(${images[frontImageIndex]})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
              transition={{ duration: 0.3 }}
              animate={{ rotateX: flip ? 180 : 0 }}
            ></motion.div>
            <motion.div
              className="absolute h-full w-full backface-hidden"
              style={{
                backgroundImage: `url(${images[backImageIndex]})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}
              initial={{ rotateX: 180 }}
              animate={{ rotateX: flip ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          </motion.div>
        </motion.div>
        <div className="text-neutral-500 font-bold text-base mb-24">Loading...</div>
      </motion.div>
    </div>
  );
}