import axios from "axios";

const instance = axios.create({
  baseURL: "https://nr-mcq.firebaseio.com/"
});

export default instance;
