using System.Text.Json;
using System.Text.Json.Serialization;
using TaskManagement.Api.Models;

namespace TaskManagement.Api.Repositories;

public class TaskRepository : ITaskRepository
{
    private readonly string _filePath;

    private readonly JsonSerializerOptions _jsonOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    public TaskRepository()
    {
        _filePath = Path.Combine(
            AppContext.BaseDirectory,
            "Data",
            "tasks.json");

        _jsonOptions.Converters.Add(new JsonStringEnumConverter());
    }

    public IEnumerable<TaskItem> GetAll()
    {
        return LoadTasks();
    }

    public TaskItem? GetById(int id)
    {
        return LoadTasks().FirstOrDefault(task => task.Id == id);
    }

    public TaskItem Add(TaskItem task)
    {
        var tasks = LoadTasks();

        task.Id = tasks.Count == 0
            ? 1
            : tasks.Max(x => x.Id) + 1;

        tasks.Add(task);

        SaveTasks(tasks);

        return task;
    }

    public bool Update(TaskItem task)
    {
        var tasks = LoadTasks();

        var existingTask = tasks.FirstOrDefault(x => x.Id == task.Id);

        if (existingTask is null)
        {
            return false;
        }

        existingTask.Title = task.Title;
        existingTask.Description = task.Description;
        existingTask.Priority = task.Priority;
        existingTask.DueDate = task.DueDate;
        existingTask.Status = task.Status;

        SaveTasks(tasks);

        return true;
    }

    public bool Delete(int id)
    {
        var tasks = LoadTasks();

        var task = tasks.FirstOrDefault(x => x.Id == id);

        if (task is null)
        {
            return false;
        }

        tasks.Remove(task);

        SaveTasks(tasks);

        return true;
    }

    private List<TaskItem> LoadTasks()
    {
        if (!File.Exists(_filePath))
        {
            throw new FileNotFoundException(
                $"Tasks file was not found: {_filePath}");
        }

        var json = File.ReadAllText(_filePath);

        return JsonSerializer.Deserialize<List<TaskItem>>(
                   json,
                   _jsonOptions)
               ?? [];
    }

    private void SaveTasks(List<TaskItem> tasks)
    {
        var json = JsonSerializer.Serialize(
            tasks,
            _jsonOptions);

        File.WriteAllText(_filePath, json);
    }
}
