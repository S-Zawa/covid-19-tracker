import React, { useCallback, useEffect, useState } from "react";
import styles from "./App.module.css";
import { Cards } from "./components";
import { fetchData } from "./api";
import { Data } from "./api/types";
import image from "./images/image.png";

function App() {
  const [data, setData] = useState<Data>({} as Data);

  useEffect(() => {
    let unmounted = false;
    (async () => {
      if (!unmounted) {
        const fetchedData = (await fetchData()) as Data;
        setData(fetchedData);
      }
    })();

    return () => {
      unmounted = true;
    };
  }, []);

  const onHandleCountryChange = useCallback(async (selectedCounty: string) => {
    const response = await fetchData(selectedCounty);
    setData({ ...response, country: selectedCounty });
  }, []);

  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} alt="COVID-19 Tracker" />
      <Cards data={data} />
    </div>
  );
}

export default App;
