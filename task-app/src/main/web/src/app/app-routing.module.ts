import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { AddtaskComponent } from './addtask/addtask.component'; 
import { EdittaskComponent } from './edittask/edittask.component';

const routes: Routes = [
  { path: 'viewtask', component: ViewtaskComponent },
  { path: 'addtask', component: AddtaskComponent },
  {path: 'edittask/:id', component: EdittaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
