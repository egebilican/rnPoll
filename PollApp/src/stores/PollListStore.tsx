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
  state: string = 'idle';

  @observable
  voteCount: number = 0;

  @action
  increaseVoteCount() {
    this.voteCount++;
  }

  @action
  async fetchPolls() {
    this.state = 'Downloading';
    try {
      const response = await getPolls();
      runInAction(() => {
        this.state = 'idle';
        this.polls = response;
      });
    } catch (error) {
      runInAction(() => {
        this.state = 'Error';
      });
    }
  }
  @action
  async vote(voteUrl: string, goBack: () => void) {
    this.state = 'Voting';
    try {
      const response = await vote(voteUrl);
      this.increaseVoteCount();
      goBack();
    } catch (error) {
      runInAction(() => {
        this.state = 'Error in voting';
      });
    }
  }

  @action
  async createQuestion(body: NewQuestionBody, goBack: () => void) {
    this.state = 'Creating Question';
    try {
      const response = await createQuestion(body);
      this.increaseVoteCount();
      goBack();
    } catch (error) {
      runInAction(() => {
        this.state = 'Error in creating';
      });
    }
  }
}
