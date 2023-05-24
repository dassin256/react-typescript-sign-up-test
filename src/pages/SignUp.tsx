import React, { useState, useEffect } from "react";

interface State {
  state_name: string;
}

interface City {
  city_name: string;
}

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    fetchStates();
    localStorage.setItem(
      "accessToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJhc2tAdW5pdmVyc2FsLXR1dG9yaWFsLmNvbSIsImFwaV90b2tlbiI6IlQ2VlBOUmZXbkxFbmdsMHd2djctZ1d2Y09KRHFPSkptc3ZoNkNOdGo5a3p1Z1RSYkhvdXVET1NXeTdzYmJzdG5taDAifSwiZXhwIjoxNjg1MDUwNTM2fQ.vbcrQ0WOsjl3gCqg87DvVrpI66rYPvlvCfejdYnHAow"
    );
  }, []);

  const fetchStates = async () => {
    try {
      const response = await fetch(
        "https://www.universal-tutorial.com/api/states/United States",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStateChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const state = event.target.value;
    setSelectedState(state);
    fetchCities(state);
  };

  const fetchCities = async (stateName: string) => {
    try {
      const response = await fetch(
        `https://www.universal-tutorial.com/api/cities/${encodeURIComponent(
          states.find((state) => state.state_name === stateName)?.state_name ??
            ""
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      firstName,
      lastName,
      state: selectedState
        ? states.find((s) => s.state_name === selectedState)?.state_name
        : "",
      city: selectedCity
        ? cities.find((c) => c.city_name === selectedCity)?.city_name
        : "",
      email,
      password,
    };
    console.log(formData);
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name : </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name : </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State : </label>
          <select
            id="state"
            value={selectedState ?? ""}
            onChange={handleStateChange}
            required
          >
            <option value="">-- Select a state --</option>
            {states.map((state) => (
              <option key={state.state_name} value={state.state_name}>
                {state.state_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="city">City : </label>
          <select
            id="city"
            value={selectedCity ?? ""}
            onChange={handleCityChange}
            required
          >
            <option value="">-- Select a city --</option>
            {cities.map((city) => (
              <option key={city.city_name} value={city.city_name}>
                {city.city_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email : </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
