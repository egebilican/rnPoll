import {observable, action, runInAction} from 'mobx';

const BASE_URL: string = 'http://polls.apiblueprint.org/';

export interface Poll {
  choices: any;
  question: any;
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
    this.polls = [];
    this.state = 'Downloading';
    try {
      const response = await fetch(`${BASE_URL}questions`);
      const myJson = await response.json();
      runInAction(() => {
        this.state = 'idle';
        this.polls = myJson;
      });
    } catch (error) {
      runInAction(() => {
        this.state = 'Error';
      });
    }
  }
  @action
  async vote(url: string, voteId: number, goBack: any) {
    this.state = 'Voting';
    console.log(`voting url: ${BASE_URL}${url}/choices/${voteId}`);
    try {
      const response = await fetch(`${BASE_URL}${url}/choices/${voteId}`, {
        method: 'POST',
      });
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
