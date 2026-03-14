import axios from "axios";

const API_KEY = "4c6adaf42e234f318c5c9470d7e5b9dd";

export const fetchNews = async () => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    );

    return response.data.articles;
  } catch (error) {
    console.log(error);
    return [];
  }
};