import { useEffect, useState } from "react";

const useCountdown = (targetDate, createdAt) => {
  console.log(targetDate, createdAt);

  const countDownDate = targetDate.map((days) => new Date(days).getTime());

  console.log(countDownDate);
  //   const countDownDate = new Date(targetDate).getTime();

  //   const [countDown, setCountDown] = useState(
  //     countDownDate - new Date().getTime()
  //   );

  const [countDown, setCountDown] = useState(
    createdAt.forEach((createDay) => countDownDate - new Date(createDay))
  );

  console.log(countDown);

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
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export { useCountdown };
