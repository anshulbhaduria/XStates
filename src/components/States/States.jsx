import React, { useEffect, useState } from "react";
import styles from "./States.module.css";
import axios from "axios";

function States() {
  const countryEndpoint =
    "https://crio-location-selector.onrender.com/countries";

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await axios.get(countryEndpoint);
        const data = response.data;
        setCountries(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      async function fetchStates() {
        try {
          const response = await axios.get(
            `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
          );
          const data = response.data;
          setStates(data);
          setSelectedState("");
          setCities([]);
          setSelectedCity("");
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      fetchStates();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      async function fetchCities() {
        try {
          const response = await axios.get(
            `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
          );
          const data = response.data;
          setCities(data);
          setSelectedCity("");
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      fetchCities();
    }
  }, [selectedCountry, selectedState]);

  return (
    <div className={styles.mainContainer}>
      <div>
        <h2>Select Location</h2>
      </div>
      <div className={styles.dropdowns}>
        <select
          name="countries"
          defaultValue="select_country"
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="select_country" disabled>
            Select Country
          </option>
          {countries.map((country) => {
            return (
              <option key={country} value={country}>
                {country}
              </option>
            );
          })}
        </select>
        <select
          name="states"
          defaultValue="select_state"
          disabled={!selectedCountry}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="select_state" disabled>
            Select State
          </option>
          {states.map((state) => {
            return (
              <option key={state} value={state}>
                {state}
              </option>
            );
          })}
        </select>
        <select
          name="cities"
          defaultValue="select_city"
          disabled={!selectedState}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="select_city" disabled>
            Select City
          </option>
          {cities.map((city) => {
            return (
              <option key={city} value={city}>
                {city}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        {selectedCity && (
          <p>{`You selected ${selectedCity}, ${selectedState}, ${selectedCountry}`}</p>
        )}
      </div>
    </div>
  );
}

export default States;
