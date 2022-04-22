/* eslint-disable no-unused-vars */
import classNames from "classnames";
import { useEffect, useState } from "react";
import { APP_ID, APP_SECRET } from "static/ids/mxnzp";
import dayjs from "dayjs";
import cardStyles from "styles/card.module.scss";
import axios from "axios";
import styles from "./index.module.scss";

type weatherType = {
  weather: string;
  address: string;
  temp: string;
};

const Weather = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [location, setLoaction] = useState("北京");
  const [text, setText] = useState<weatherType | null>(null);
  const fetchWeather = async () => {
    axios
      .get(
        `https://www.mxnzp.com/api/weather/current/${location}?app_id=${APP_ID}&app_secret=${APP_SECRET}`
      )
      .then((res) => {
        setText(res?.data?.data);
      });
  };
  useEffect(() => {
    fetchWeather();
  }, [location]);
  return (
    <div className={classNames(cardStyles.card, styles.now)}>
      {text?.weather ? (
        <>
          <strong className={styles.weather}>{text.weather}</strong>

          <span> {dayjs().format("MMMD[日]  ddd")}</span>

          <span className={styles.address}> {text.address}</span>
          <span> {text.temp}</span>
        </>
      ) : (
        <>{dayjs().format("YY[年]MMMD[日]  ddd")}</>
      )}
    </div>
  );
};

export default Weather;
