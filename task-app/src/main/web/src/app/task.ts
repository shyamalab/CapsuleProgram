import { ParentTask } from './parent-task';

export class Task {
    Task_ID: number;
    Task: string;
    Start_Date:string;
    End_Date:string;
    Priority:string;
    EndTask:boolean;
    parent_Task: ParentTask;
}
