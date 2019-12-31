import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Task } from '../task';
import { BackendService } from "./../backend.service";
import { Router, NavigationEnd } from '@angular/router';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
declare var jQuery: any;

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  alltaskList: any = [];

  @Input() taskmodel = {
    task: '',
    start_Date: '',
    end_Date: '',
    priority: '',
    EndTask: true,
    parent_Task: {
      parTask: ''
    }
  }


  hoveredDate: NgbDate;
  calendarToday: NgbCalendar
  fromDate: NgbDate;
  toDate: NgbDate;
  submitted = false;

  tasknameLabel: string;
  parenttaskLabel: string;

  constructor(private backendService: BackendService,
    public router: Router,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private translate: TranslateService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

    backendService.getviewtasklist().subscribe((data: any) => {
      this.alltaskList = data;
    });
  }

  ngOnInit() {
    this.submitted = false;
    this.translate.get(['TaskLabel', 'ParentLabel'])
      .subscribe(translations => {
        this.tasknameLabel = translations['TaskLabel'];
        this.parenttaskLabel = translations['ParentLabel'];
      });
  }

  addtask(data) {
     this.submitted = true;
    this.taskmodel.start_Date = this.convertDateJsonToString(this.fromDate);
    this.taskmodel.end_Date = this.convertDateJsonToString(this.toDate),
      this.backendService.addtaskService(this.taskmodel)
        .subscribe((data: {}) => {
          this.router.navigate(['/addtask']);
        })

    this.taskmodel = {
      task: '',
      start_Date: '',
      end_Date: '',
      priority: '',
      EndTask: true,
      parent_Task: {
        parTask: ''
      }
    }
    this.fromDate = null;
    this.toDate = null;
  }
  resetButton() {
 this.submitted=false;
    this.taskmodel = {
      task: '',
      start_Date: '',
      end_Date: '',
      priority: '',
      EndTask: true,
      parent_Task: {
        parTask: ''
      }
    }
    this.fromDate = null;
    this.toDate = null;
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate, input: string): NgbDate {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  convertDateJsonToString(json: any) {
    if (json !== undefined && json !== null) {
      return json.day + '/' + json.month + '/' + json.year;
    }
  }

}


