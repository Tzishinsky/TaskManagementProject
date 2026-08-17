using TaskManagement.Api.DTOs;
using TaskManagement.Api.Models;

namespace TaskManagement.Api.Services;

public interface ITaskService
{
    IEnumerable<TaskItem> GetTasks();

    TaskItem? GetTaskById(int id);

    TaskItem CreateTask(CreateTaskRequest request);

    bool UpdateTask(int id, UpdateTaskRequest request);

    bool DeleteTask(int id);
}