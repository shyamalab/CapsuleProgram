import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from "./../backend.service";
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Task } from '../task';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css']
})
export class EdittaskComponent implements OnInit {

  Task: any;
  id = this.actRoute.snapshot.params['id'];
  alltaskList: any = [];
  dateLabel: string;
  hoveredDate: NgbDate;
  calendarToday: NgbCalendar
  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(public backendservice: BackendService,
    public actRoute: ActivatedRoute,
    public router: Router,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private translate: TranslateService) {
    backendservice.getviewtasklist().subscribe((data: any) => {
      this.alltaskList = data;
    });
    this.backendservice.gettaskbyID(this.id).subscribe((data: any) => {
      this.Task = data
    })
  }

  ngOnInit() {
    this.translate.get(['dateplaceholder'])
      .subscribe(translations => {
        this.dateLabel = translations['dateplaceholder'];
      });
    this
  }
  updateTask() {
    this.Task.start_Date = this.convertDateJsonToString(this.fromDate) === undefined ? this.Task.start_Date : this.convertDateJsonToString(this.fromDate);
    this.Task.end_Date = this.convertDateJsonToString(this.toDate) === undefined ? this.Task.end_Date : this.convertDateJsonToString(this.toDate);

    this.backendservice.edittask(this.id, this.Task).subscribe(data => {
      this.router.navigate(['/viewtask']);

    })
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
