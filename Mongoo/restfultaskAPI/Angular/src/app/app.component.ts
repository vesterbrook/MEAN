import { Component } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tasks app';
  tasks;
  taskid;
  flag1 : boolean;
  flag2 : boolean;
  // num: number;
  newTask: any;
  updated: any;
  foundtask={};
  
  
  // onButtonClick(): void {
  //   console.log('click bae');
  //   this.tasks = this.tasks;
  //   // this.cottoncandy = true;
  //   console.log("Clicked clicked bish", this.tasks);
  // }
  
  onSubmit(): void {
    let observable = this._httpService.getTasksById(this.taskid);
    observable.subscribe(data => {
     this.newTask = data['tasks'];
     this.getTasksFromService();
    });
  }

  constructor(private _httpService: HttpService){}
  ngOnInit() {
    this.getTasksFromService();
    this.newTask = { title: "", description: ""}
    this.updated = {title: "", description: ""}
  }

  getTasksFromService (){
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log("Tasks from service", data)
      this.tasks = data['tasks'];
    });
  }

  getTaskById(taskid){
    let observable = this._httpService.getTasksById(taskid);
    observable.subscribe(data => {
      this.foundtask = data["task"];
      console.log(this.foundtask)
      this.getTasksFromService();
  });
  }

  createTask(): void {
    let observable = this._httpService.addTask(this.newTask)
    observable.subscribe(data => {
      console.log("TASK", data)
      this.newTask = {title: "", description: ""};
      this.getTasksFromService();
    });
  }

  updateTask(taskid, updated) {
    let observable = this._httpService.updateTask(taskid, this.updated);
    observable.subscribe(data => {
      this.updated = {title: "", description: ""};
      this.getTasksFromService();
    });
  }

  delete(taskid) {
    let observable = this._httpService.delete(taskid);
    observable.subscribe(data => {
      this.getTasksFromService();
    });
  }

}
