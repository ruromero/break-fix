export class Level {
  id: number;
  status: LevelStatus;
  score: number;

  constructor(id: number, score: number, status: LevelStatus) {
    this.id = id;
    this.score = score;
    this.status = status;
  }
}
export enum LevelStatus {
  Locked,
  Unlocked,
  Broken,
  Fixed
}
