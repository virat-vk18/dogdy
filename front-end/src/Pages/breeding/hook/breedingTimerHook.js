import { useEffect, useState } from "react";

const useCountdown = (targetDate, createdAt) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date(createdAt).getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  // calculate time left
  //   const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  //   const hours = Math.floor(
  //     (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //   );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [minutes, seconds];
};

export { useCountdown };
