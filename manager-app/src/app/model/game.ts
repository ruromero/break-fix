import { Level } from './level';

export class Game {
  id: string;
  username: string;
  currentLevel: number;
  levels: Array<Level> = new Array();
  key: string;
  maxScore: number;
}
