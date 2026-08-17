import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Task } from '../../../models/task';
import { getApiError } from '../../../core/utils/api-error.util';
import { TaskService } from '../../../core/services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { UI_TEXT } from '../../../core/constants/ui-text.constants';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskFormComponent , TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {

  private readonly taskService = inject(TaskService);

  readonly tasks = signal<Task[]>([]);
  readonly selectedTask = signal<Task | null>(null);
  readonly isLoading = signal(false);
  readonly deletingTaskId = signal<number | null>(null);
  readonly errorMessage = signal<string | null>(null);
  readonly text = UI_TEXT;

  ngOnInit(): void {
    this.loadTasks();
  }

 loadTasks(): void {
  this.isLoading.set(true);
  this.errorMessage.set(null);

  this.taskService.getTasks().subscribe({
    next: (tasks) => {
      this.tasks.set(tasks);
      this.isLoading.set(false);
    },
    error: (error: HttpErrorResponse) => {
      this.deletingTaskId.set(null);

      const apiError = getApiError(error);

      this.errorMessage.set(apiError.message);
    }
  });
}

  onTaskUpdated(): void {
    this.selectedTask.set(null);
    this.loadTasks();
 }

  onEdit(task: Task): void {
    this.selectedTask.set(task);
  }

  onDelete(id: number): void {
  if (this.deletingTaskId() !== null) {
    return;
  }

  const confirmed = window.confirm(
    'Are you sure you want to delete this task?'
  );

  if (!confirmed) {
    return;
  }

  this.deletingTaskId.set(id);
  this.errorMessage.set(null);

  this.taskService.deleteTask(id).subscribe({
    next: () => {
      this.deletingTaskId.set(null);
      this.loadTasks();
    },
    error: () => {
      this.deletingTaskId.set(null);
      this.errorMessage.set('Failed to delete task.');
    }
  });
}
}