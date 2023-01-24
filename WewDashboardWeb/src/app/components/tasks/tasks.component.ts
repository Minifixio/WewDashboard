import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { TodoTask } from 'src/app/models/TodoTask';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  // 10 minutes interval
  taskInterval = interval(1000*60*10)
  todoTasks= {} as Promise<TodoTask[]>

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.taskInterval.subscribe(() => {
      this.todoTasks = this.apiService.get("calendar", "tasks")
    })
  }

  getDateTitle(dateStr: string) {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long'})
  }
}
