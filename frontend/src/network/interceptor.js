import axios from 'axios';
import {BASE_URL} from "../utils/constants";

const restClient = axios.create({
    baseURL: BASE_URL,
    headers: {'X-API-Key': 'root'}
});

export default restClient;
