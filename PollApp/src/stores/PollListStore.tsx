import {observable, action, runInAction} from 'mobx';
import getPolls from '../services/getPolls';
import vote from '../services/vote';

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

export class PollListStore {
  @observable
  polls: Poll[] = [];

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
  async vote(voteUrl: string, goBack: any) {
    this.state = 'Voting';
    try {
      const response = await vote(voteUrl);
      console.log('Vote resp', response);
      this.increaseVoteCount();
      goBack();
    } catch (error) {
      runInAction(() => {
        this.state = 'Error in voting';
      });
    }
  }
}
