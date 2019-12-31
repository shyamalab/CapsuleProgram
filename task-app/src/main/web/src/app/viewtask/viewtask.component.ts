import { Component, OnInit } from '@angular/core';
import { BackendService } from "./../backend.service";
import { Task } from "../Task";
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { DOCUMENT } from '@angular/platform-browser';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent, NgbDatepicker, NgbDatepickerConfig, NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
declare var jQuery: any;

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {

  calendarToday: NgbCalendar
  alltaskList: any = [];
  task: any = {};
  screenLoader: boolean = false;
  modalBody: string = '';

  dateLabel: string;

  constructor(calendar: NgbCalendar, config: NgbDatepickerConfig, private backendService: BackendService,
    private router: Router,
    private translate: TranslateService) {
    this.screenLoader = true;
    this.backendService.updatetask = null;
    backendService.getviewtasklist().subscribe((data: any) => {
      this.alltaskList = data;
      this.screenLoader = false;
    });
  }

  ngOnInit() {
    this.translate.get(['dateplaceholder'])
      .subscribe(translations => {
        this.dateLabel = translations['dateplaceholder'];
      });
  }


  onDateSelectPicker(date: NgbDate, field: string) {
    if (field === 'start') {
      this.task.start_Date = this.convertDateJsonToString(this.task.start_Date);
      setTimeout(() => {
        jQuery("#start_Date").val(this.task.start_Date);
      }, 50);
    } else if (field === 'end') {
      this.task.end_Date = this.convertDateJsonToString(this.task.end_Date);
      setTimeout(() => {
        jQuery("#end_Date").val(this.task.end_Date);
      }, 50);
    }
  }

  convertDateJsonToString(json: any) {
    if (json !== undefined && json !== null) {
      return json.day + '/' + json.month + '/' + json.year;
    }
  }

  getParentTaskName(item: any) {
    var parentTaskName = '';
    if (item !== null && item !== undefined) {
      if (item.parent_Task !== null && item.parent_Task !== undefined) {
        parentTaskName = item.parent_Task.parTask;
      }
    }
    return parentTaskName;
  }

  endTask(item: any) {
    this.screenLoader = true;
    item.endTask = true;
    this.backendService.edittask(item.task_ID, item).subscribe(
      (data: any) => {
        this.screenLoader = false;
        this.modalBody = 'Task Ended Successfully';

      }
    );
  }

  editTask(task: any) {
    this.backendService.updatetask = task;
    this.router.navigate(['/edittask']);
  }
}
