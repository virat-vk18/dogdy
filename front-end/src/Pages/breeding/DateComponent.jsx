import React from "react";
import { useGetAllDogsQuery } from "./breedingApi";

const DateComponent = () => {
  const { isLoading, data: farmData, error, isSuccess } = useGetAllDogsQuery();
  if (isSuccess) {
    const timer = farmData.allDogs[0].studfarmdays;
    const newDate = new Date(timer);
    const currentDate = new Date();
    const totalSeconds = (newDate - currentDate) / 1000;
    const days = formatTime(Math.floor(totalSeconds / 3600 / 24));
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    console.log(days);
    function formatTime(time) {
      return time < 10 ? `0${time}` : time;
    }
    console.log(totalSeconds);
  }
  return <div>DateComponent</div>;
};

export default DateComponent;
