export interface IProject {
  id?: number;
  name?: string;
}

export class Project implements IProject {
  constructor(public id?: number, public name?: string) {}
}
