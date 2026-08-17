using TaskManagement.Api.Models;
using TaskStatusModel = TaskManagement.Api.Models.TaskStatus;

namespace TaskManagement.Api.DTOs;

public class CreateTaskRequest
{
    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public TaskPriority Priority { get; set; }

    public DateTime? DueDate { get; set; }

    public TaskStatusModel Status { get; set; }
}