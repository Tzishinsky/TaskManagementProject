import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';

import { DatePipe } from '@angular/common';
import {
  UI_TEXT,
  TASK_PRIORITY_LABELS,
  TASK_STATUS_LABELS
} from '../../../core/constants/ui-text.constants';
import { Task } from '../../../models/task';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent {

  readonly task = input.required<Task>();

  readonly edit = output<Task>();
  readonly delete = output<number>();
  readonly isDeleting = input(false);
  readonly text = UI_TEXT;

  readonly priorityLabels = TASK_PRIORITY_LABELS;
  readonly statusLabels = TASK_STATUS_LABELS;

  onEdit(): void {
    this.edit.emit(this.task());
  }

  onDelete(): void {
    this.delete.emit(this.task().id);
  }
}
