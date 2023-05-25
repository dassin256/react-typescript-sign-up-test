export const getCountries = async () => {
  try {
    const response = await fetch(
      `https://www.universal-tutorial.com/api/countries/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          Accept: "application/json",
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getStates = async (country: string) => {
  try {
    const response = await fetch(
      `https://www.universal-tutorial.com/api/states/${country}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          Accept: "application/json",
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getCities = async (state: string) => {
  try {
    const response = await fetch(
      `https://www.universal-tutorial.com/api/cities/${state}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          Accept: "application/json",
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
