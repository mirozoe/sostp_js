export const readData = async () => {
  const result = await fetch(
    "https://europe-west3-"
  );
  if (result.status == 200) {
    const resp = await result.json();
    return resp;
  } else {
    console.log("Error: ", result.status);
    return [];
  }
};
