export class Level {
  id: number;
  name: string;
  status: LevelStatus;
  score: number;
  startedAt: number;
  maxScore: number;
  bonus: boolean;

  constructor(id: number, name: string, maxScore: number, bonus: boolean) {
    this.id = id;
    this.name = name;
    this.bonus = bonus;
    this.maxScore = maxScore;
  }
}
export enum LevelStatus {
  Locked,
  Unlocked,
  Broken,
  Fixed
}
