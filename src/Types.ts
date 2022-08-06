export interface IFile {
  name: string;
  task: string;
  variant: string;
  text: string;
  isDone: boolean;
}

export interface ITaskVariants {
  [solutionName: string]: {
    text: string;
  };
}

export interface IContestInfo {
  tasks: {
    [taskName: string]: ITaskVariants;
  };
}
