using TaskManagement.Api.Models;

namespace TaskManagement.Api.Repositories;

public interface ITaskRepository
{
    IEnumerable<TaskItem> GetAll();

    TaskItem? GetById(int id);

    TaskItem Add(TaskItem task);

    bool Update(TaskItem task);

    bool Delete(int id);
}