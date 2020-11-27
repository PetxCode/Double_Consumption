import React, { useState, useEffect } from "react";
import axiosW from "axios";
import axios from "./axios";
import pix from "./peter.jpg";

function School() {
  const [formInput, setFormInput] = useState({});
  const [formData, setFormData] = useState([]);
  const [weather, setWeather] = useState([]);
  const [cityName, setCityName] = useState("Lagos");

  const onChangeForm = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const getWeather = async () => {
    // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

    const res = await axiosW(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=36e166465dbd63c7d02282ffb365ef12`
    );
    console.log(res.data);
    if (res.data) {
      return setWeather(res.data);
    }
  };

  const getData = async () => {
    const res = await axios.get("");
    console.log(res.data);
    if (res.data) {
      return setFormData(res.data);
    }
  };

  const postData = async () => {
    const res = await axios.post("/", formInput);
    if (res.data) {
      return getData();
    }
  };

  useEffect(() => {
    getData();
    getWeather();
  }, []);
  return (
    <>
      <header>
        <h2>Double API consumption</h2>
      </header>
      <form onSubmit={postData}>
        <input
          type="text"
          placeholder="Name of School"
          name="name"
          onChange={onChangeForm}
        />

        <input
          style={{ resize: "none" }}
          type="text"
          placeholder="School's Description"
          name="description"
          onChange={onChangeForm}
        />

        <input type="file" onChange={onChangeForm} />

        <button>Submit</button>
      </form>
      <hr />
      <section>
        <aside>
          <input
            type="text"
            placeholder="Search a City"
            value={cityName}
            onChange={(e) => {
              setCityName(e.target.value);
            }}
          />
          <button onClick={getWeather}>Search</button>
        </aside>
        <aside>Temperatue:{weather.main.temp} 🥵 </aside>
      </section>
      <hr />
      <section>
        {formData.map(({ id, name, description, img }) => (
          <aside key={id}>
            <h2>{name}</h2>
            <img
              src={img ? `http://localhost:1337${img.formats.medium.url}` : pix}
              alt={name}
            />
            <p>{description}</p>
          </aside>
        ))}
      </section>
    </>
  );
}

export default School;
