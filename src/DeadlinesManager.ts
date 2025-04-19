import * as vscode from "vscode";

const KEY = "vsschooldeadlines";

type File = {
  name: string;
  path: string;
  content: string;
};

type Status = "TO_DO" | "IN_PROGRESS" | "SUBMITTED" | "COMPLETED";

type Lesson = {
  id: number;
  deadline: "string";
  points: number;
  comment: string;
  status: Status;
  title: string;
  files: File[];
};

export class DeadlinesManager {
  static globalState: vscode.Memento;

  static setDeadlines(deadlinesArray: Array<Lesson>) {
    const serializedDeadlines = JSON.stringify(deadlinesArray);
    return this.globalState.update(KEY, serializedDeadlines);
  }

  static getDeadlines(): Array<Lesson> | undefined {
    const deadlinesString = this.globalState.get<string>(KEY);
    if (deadlinesString) {
      return JSON.parse(deadlinesString);
    }
    return undefined;
  }
}
