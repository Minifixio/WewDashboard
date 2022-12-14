import { Component, OnInit } from '@angular/core';
import { TodoTask } from 'src/app/models/TodoTask';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  todoTasks= {} as Promise<TodoTask[]>

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.todoTasks = this.apiService.get("calendar", "tasks")
  }

}
