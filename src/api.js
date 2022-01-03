export async function fetchImages(breed) {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${breed}&type=multiple`
    );
    const data = await response.json();
    return data.results;
  }