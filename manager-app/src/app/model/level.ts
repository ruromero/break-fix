export class Level {
  id: number;
  name: string;
  status: LevelStatus;
  score: number;
  startedAt: number;

  constructor(id: number, name: string, score: number, status: LevelStatus) {
    this.id = id;
    this.name = name;
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
