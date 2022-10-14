export interface Offset {
  top: number,
  left: number,
  transform: string
}

export interface Voice {
  desc: string,
  voice: string
}

export interface SkillEffect {
  type: string,
  phase: number[],
}
export interface Skill {
  name: string,
  desc: string,
  img: string,
  type: string[],
  effect?: SkillEffect
}
export interface Hero {
  id: number;
  name: string;
  headImg: string;
  cover: string;
  poster: string;
  mark: string;
  survival: number;
  attack: number;
  effect: number;
  difficulty: number;
  camp: string;
  energy: string;
  identity: string;
  location: string;
  period: string;
  profession: string;
  specialty: string;
  height: number;
  gamestory: string;
  history: string;
  offset: Offset;
  voices: Voice[];
  skills: Skill[];
}