import axios from 'axios';
import {BASE_URL, NewQuestionBody} from '../stores/PollListStore';

export default async (body: NewQuestionBody) => {
  const response = await axios.post(`${BASE_URL}questions`, body);
  console.log('resp', response);
  return response.data;
};
