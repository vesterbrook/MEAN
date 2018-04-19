import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getTasks(){
    return this._http.get('/tasks');
  }
  getTasksById(taskid){
    return this._http.get(`/viewtask/${taskid}`);
  }

  addTask(newTask) {
    return this._http.post('/addTask', newTask)
  }

  updateTask(taskid, updated) {
    return this._http.get(`/viewtask/${taskid}`, updated)
  }

  delete(taskid) {
    return this._http.delete(`/viewtask/${taskid}`)
  }
}


