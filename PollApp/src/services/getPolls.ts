import axios from 'axios';
import {BASE_URL} from '../stores/PollListStore';

export default async () => {
  const response = await axios.get(`${BASE_URL}questions`);
  return response.data;
};
