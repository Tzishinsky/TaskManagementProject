using TaskManagement.Api.DTOs;
using TaskManagement.Api.Models;
using TaskManagement.Api.Repositories;

namespace TaskManagement.Api.Services;

public class TaskService : ITaskService
{
    private readonly ITaskRepository _taskRepository;

    public TaskService(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public IEnumerable<TaskItem> GetTasks()
    {
        return _taskRepository.GetAll();
    }

    public TaskItem? GetTaskById(int id)
    {
        return _taskRepository.GetById(id);
    }

    public TaskItem CreateTask(CreateTaskRequest request)
    {
        var task = new TaskItem
        {
            Title = request.Title,
            Description = request.Description,
            Priority = request.Priority,
            DueDate = request.DueDate,
            Status = request.Status
        };

        return _taskRepository.Add(task);
    }

    public bool UpdateTask(int id, UpdateTaskRequest request)
    {
        var existingTask = _taskRepository.GetById(id);

        if (existingTask is null)
        {
            return false;
        }

        existingTask.Title = request.Title;
        existingTask.Description = request.Description;
        existingTask.Priority = request.Priority;
        existingTask.DueDate = request.DueDate;
        existingTask.Status = request.Status;

        return _taskRepository.Update(existingTask);
    }

    public bool DeleteTask(int id)
    {
        return _taskRepository.Delete(id);
    }
}
