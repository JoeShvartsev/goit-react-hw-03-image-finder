import axios from "axios";
const API_KEY = "36749422-339c82364b645e4ed63871096"

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
});

export async function fetchData(querry,page,perPage) {
  try {
    const response = await instance.get(`?q=${querry}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`);
    console.log(response.data);
    return response.data
    
  } catch (error) {

    console.error(error);
  }}
