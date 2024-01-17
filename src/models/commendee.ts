import { ICommendation } from './commendation';

export interface ICommendee {
  name: string;
  commendations: ICommendation[];
}
