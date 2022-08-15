import axios from "axios";
import env from "react-dotenv";

/**
 * Axios instance for communicating with API.
 */
const Axios = axios.create({
  baseURL: `http://127.0.0.1:${env.SERVER_PORT}`,
});

export default Axios;
