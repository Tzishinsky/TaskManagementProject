import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { supabase } from './supabase.client';
import { Task, TaskPriority, TaskStatus } from '../../models/task';

export interface TaskRequest {
  title: string;
  description: string | null;
  priority: TaskPriority;
  dueDate: string | null;
  status: TaskStatus;
}

interface TaskRow {
  id: string;
  title: string;
  description: string | null;
  priority: string;
  due_date: string | null;
  status: string;
  created_at: string;
}

function mapRow(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    priority: row.priority as TaskPriority,
    dueDate: row.due_date,
    status: row.status as TaskStatus
  };
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  getTasks(): Observable<Task[]> {
    const promise = supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) throw error;
        return (data as TaskRow[]).map(mapRow);
      });
    return from(promise);
  }

  createTask(request: TaskRequest): Observable<Task> {
    const promise = supabase
      .from('tasks')
      .insert({
        title: request.title,
        description: request.description,
        priority: request.priority,
        due_date: request.dueDate,
        status: request.status
      })
      .select()
      .single()
      .then(({ data, error }) => {
        if (error) throw error;
        return mapRow(data as TaskRow);
      });
    return from(promise);
  }

  updateTask(id: string, request: TaskRequest): Observable<void> {
    const promise = supabase
      .from('tasks')
      .update({
        title: request.title,
        description: request.description,
        priority: request.priority,
        due_date: request.dueDate,
        status: request.status
      })
      .eq('id', id)
      .then(({ error }) => {
        if (error) throw error;
      });
    return from(promise);
  }

  deleteTask(id: string): Observable<void> {
    const promise = supabase
      .from('tasks')
      .delete()
      .eq('id', id)
      .then(({ error }) => {
        if (error) throw error;
      });
    return from(promise);
  }
}
