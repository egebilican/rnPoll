import {observable, action, runInAction} from 'mobx';
import getPolls from '../services/getPolls';
import vote from '../services/vote';
import createQuestion from '../services/createQuestion';

export const BASE_URL: string =
  'https://private-2b230e-pollsapi.apiary-proxy.com/';

export interface Poll {
  choices: Choice[];
  question: any;
  url: string;
}

export interface Choice {
  choice: string;
  votes: number;
  url: string;
}
export interface NewQuestionBody {
  question: string;
  choices: string[];
}

export class PollListStore {
  @observable
  polls: Poll[] = [];

  //TODO: make it meaningful
  @observable
  state: 'idle' | 'downloading' | 'error' | 'posting' | 'posted' | 'voting' =
    'idle';

  @observable
  voteCount: number = 0;

  @action
  increaseVoteCount() {
    this.voteCount++;
  }

  @action
  async fetchPolls() {
    this.state = 'downloading';
    try {
      const response = await getPolls();
      runInAction(() => {
        this.state = 'idle';
        this.polls = response;
      });
    } catch (error) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }

  @action
  async vote(voteUrl: string, goBack: () => void) {
    this.state = 'voting';
    try {
      const response = await vote(voteUrl);
      this.increaseVoteCount();
      this.state = 'idle';
      goBack();
    } catch (error) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }

  @action
  async createQuestion(body: NewQuestionBody, goBack: () => void) {
    console.log('here we are');
    try {
      this.state = 'posting';
      const response = await createQuestion(body);
      this.state = 'posted';
      //goBack();
    } catch (error) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }
}
