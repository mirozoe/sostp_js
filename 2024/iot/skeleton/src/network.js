export async function getData() {
  const response = await fetch(
    "https://europe-west3",
  );
  if (response.status === 200) {
    return await response.json();
  }
  console.error(`Issue with fetching data: ${response.status}`);
}
