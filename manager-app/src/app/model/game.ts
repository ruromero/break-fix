import { Level } from './level';

export class Game {
  username: string;
  currentLevel: number;
  levels: Array<Level> = [];
}
