import axios from 'axios';
import {BASE_URL} from '../stores/PollListStore';

export default async (voteUrl: string) => {
  const response = await axios.post(`${BASE_URL}${voteUrl}`);
  return response.data;
};
