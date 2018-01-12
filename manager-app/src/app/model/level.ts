export class Level {
  id: number;
  name: string;
  status: LevelStatus;
  score: number;
  startedAt: number;
  timeToSolve: number;
  bonus: boolean;

  constructor(id: number, name: string, timeToSolve: number, bonus: boolean) {
    this.id = id;
    this.name = name;
    this.bonus = bonus;
    this.timeToSolve = timeToSolve;
    if(bonus || id === 1) {
      this.status = LevelStatus.Unlocked;
    } else {
      this.status = LevelStatus.Locked;
    }

  }
}
export enum LevelStatus {
  Locked,
  Unlocked,
  Broken,
  Fixed
}
