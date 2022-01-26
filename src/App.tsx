import React, { useCallback, useEffect, useState } from "react";
import styles from "./App.module.css";
import { Cards, CountryPicker, Chart } from "./components";
import { fetchData } from "./api";
import { Data } from "./api/types";
import image from "./images/image.png";

function App() {
  const [data, setData] = useState<Data>({} as Data);

  useEffect(() => {
    async function fetchDataAsync() {
      setData((await fetchData()) as Data);
    }
    fetchDataAsync();
  }, []);

  const onHandleCountryChange = useCallback(async (selectedCounty: string) => {
    console.log(selectedCounty);
    const response = await fetchData(
      selectedCounty === "global" ? "" : selectedCounty
    );
    setData({ ...response, country: selectedCounty });
  }, []);

  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} alt="COVID-19 Tracker" />
      <Cards data={data} />
      <CountryPicker handleCountryChange={onHandleCountryChange} />
      <Chart data={data} />
    </div>
  );
}

export default App;
