import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  SimpleChanges,
  inject,
  input,
  output,
  signal
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { HttpErrorResponse } from '@angular/common/http';

import {
  Task,
  TaskPriority,
  TaskStatus
} from '../../../models/task';

import {
  TaskRequest,
  TaskService
} from '../../../core/services/task.service';

import { ApiError } from '../../../models/api-error';

import { getApiError } from '../../../core/utils/api-error.util';
import {
  UI_TEXT,
  TASK_PRIORITY_LABELS,
  TASK_STATUS_LABELS
} from '../../../core/constants/ui-text.constants';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent implements OnChanges {

  private readonly fb = inject(FormBuilder);
  private readonly taskService = inject(TaskService);

  readonly taskCreated = output<void>();
  readonly taskUpdated = output<void>();
  readonly taskToEdit = input<Task | null>(null);
  readonly isSubmitting = signal(false);
  readonly isEditMode = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly fieldErrors = signal<Record<string, string[]>>({});

  readonly text = UI_TEXT;

  readonly priorityLabels = TASK_PRIORITY_LABELS;
  readonly statusLabels = TASK_STATUS_LABELS;
  
  readonly priorities = Object.values(TaskPriority);
  readonly statuses = Object.values(TaskStatus);

  readonly taskForm = this.fb.nonNullable.group({
    title: [
      '',
      [
        Validators.required,
        Validators.maxLength(100)
      ]
    ],

    description: [
      '',
      Validators.maxLength(500)
    ],

    priority: [
      TaskPriority.Medium,
      Validators.required
    ],

   dueDate: [
    '',
    Validators.required
  ],

    status: [
      TaskStatus.Pending,
      Validators.required
    ]
  });

 ngOnChanges(changes: SimpleChanges): void {
  if (!changes['taskToEdit']) {
    return;
  }

  const task = this.taskToEdit();

  if (!task) {
    this.isEditMode.set(false);

    this.taskForm.reset({
      title: '',
      description: '',
      priority: TaskPriority.Medium,
      dueDate: '',
      status: TaskStatus.Pending
    });

    return;
  }

  this.isEditMode.set(true);

  this.taskForm.patchValue({
    title: task.title,
    description: task.description ?? '',
    priority: task.priority,
    dueDate: task.dueDate
      ? task.dueDate.substring(0, 10)
      : '',
    status: task.status
  });
}

  get titleControl() {
    return this.taskForm.controls.title;
  }
  

  onSubmit(): void {
    this.errorMessage.set(null);
    this.fieldErrors.set({});
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const task = this.taskToEdit();

    if (task) {
      this.updateTask(task.id);
      return;
    }

    this.createTask();
  }

  getFieldErrors(fieldName: string): string[] {
    return this.fieldErrors()[fieldName] ?? [];
  }

  private createTask(): void {
  const request: TaskRequest = {
    ...this.taskForm.getRawValue(),
    description:
      this.taskForm.controls.description.value || null,
    dueDate:
      this.taskForm.controls.dueDate.value || null
  };

  this.isSubmitting.set(true);
  this.errorMessage.set(null);

  this.taskService.createTask(request).subscribe({
    next: () => {
      this.resetForm();
      this.isSubmitting.set(false);
      this.taskCreated.emit();
    },

   error: (error: HttpErrorResponse) => {
      const apiError = getApiError(error);

      this.errorMessage.set(apiError.message);
      this.fieldErrors.set(apiError.errors ?? {});

      this.isSubmitting.set(false);
    }
  });
  }

  private updateTask(id: number): void {
  const request: TaskRequest = {
    ...this.taskForm.getRawValue(),
    description:
      this.taskForm.controls.description.value || null,
    dueDate:
      this.taskForm.controls.dueDate.value || null
  };

  this.isSubmitting.set(true);
  this.errorMessage.set(null);

  this.taskService.updateTask(id, request).subscribe({
    next: () => {
      this.resetForm();
      this.isSubmitting.set(false);
      this.taskUpdated.emit();
    },

    error: (error: HttpErrorResponse) => {
      const apiError = getApiError(error);

      this.errorMessage.set(apiError.message);
      this.fieldErrors.set(apiError.errors ?? {});

      this.isSubmitting.set(false);
    }
  });
  }

 private resetForm(): void {
  this.taskForm.reset({
    title: '',
    description: '',
    priority: TaskPriority.Medium,
    dueDate: '',
    status: TaskStatus.Pending
  });

  this.fieldErrors.set({});
  this.errorMessage.set(null);
  this.isEditMode.set(false);
}

}
