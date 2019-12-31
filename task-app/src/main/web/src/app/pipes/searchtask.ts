import { Pipe, PipeTransform } from '@angular/core';

import { stringify } from 'querystring';

@Pipe({ name: 'taskSearchPipe', pure: false })
export class TaskSearchPipe implements PipeTransform {
    itemstart: any;
    date: Date = null;
    transform(items: Array<any>, filtertask: any) {
        if (items && items.length) {
            return items.filter(item => {

                if (filtertask.task && item.task.toLowerCase().indexOf(filtertask.task.toLowerCase()) === -1) {
                    return false;
                }

                if (filtertask.parentTaskName && item.parent_Task.parTask &&
                    item.parent_Task.parTask.toLowerCase().indexOf(filtertask.parentTaskName.toLowerCase()) === -1) {
                    return false;
                }

                if (filtertask.start_Date && item.start_Date) {
                    if (filtertask.start_Date !== undefined && filtertask.start_Date !== null) {
                        this.itemstart = filtertask.start_Date.day + '/' + filtertask.start_Date.month + '/' + filtertask.start_Date.year;
                    }
                    let str = item.start_Date;
                    let day = str.split('/')[0];
                    let month = str.split('/')[1];
                    let year = str.split('/')[2];

                    let first = new Date(filtertask.start_Date.year, filtertask.start_Date.month - 1, filtertask.start_Date.day);
                    let second = new Date(year, month - 1, day)

                    if (first > second) {
                        return false;
                    }
                }

                if (filtertask.end_Date && item.end_Date) {
                    if (filtertask.end_Date !== undefined && filtertask.end_Date !== null) {
                        this.itemstart = filtertask.end_Date.day + '/' + filtertask.end_Date.month + '/' + filtertask.end_Date.year;
                    }
                    let str = item.end_Date;
                    let day = str.split('/')[0];
                    let month = str.split('/')[1];
                    let year = str.split('/')[2];

                    let first = new Date(filtertask.end_Date.year, filtertask.end_Date.month - 1, filtertask.end_Date.day);
                    let second = new Date(year, month - 1, day)

                    if (first < second) {
                        return false;
                    }
                }
                if (filtertask.priorityFrom && item.priority && parseInt(item.priority) < parseInt(filtertask.priorityFrom)) {
                    return false;
                }
                if (filtertask.priorityTo && item.priority && parseInt(item.priority) > parseInt(filtertask.priorityTo)) {
                    return false;
                }
                return true;
            })
        }
        else {
            return items;
        }
    }
}