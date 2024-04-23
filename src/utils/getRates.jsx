export const getRates = async (base) => {
  const url = process.env.REACT_APP_GET_RATES + `${base}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("E: ", error);
    return [];
  }
};
