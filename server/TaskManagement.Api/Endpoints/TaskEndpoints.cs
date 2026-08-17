using TaskManagement.Api.DTOs;
using TaskManagement.Api.Services;
using FluentValidation;
using TaskManagement.Api.Responses;

namespace TaskManagement.Api.Endpoints;

public static class TaskEndpoints
{
    public static void MapTaskEndpoints(this WebApplication app)
    {
        var tasks = app.MapGroup("/api/tasks");

        tasks.MapGet("/", (ITaskService taskService) =>
        {
            var result = taskService.GetTasks();

            return Results.Ok(result);
        })
        .WithName("GetTasks");

        tasks.MapGet("/{id:int}", (int id, ITaskService taskService) =>
        { 
            var task = taskService.GetTaskById(id);

            if (task is null)
                {
                    return Results.NotFound(new ApiErrorResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = $"Task with id {id} was not found."
                    });
                }

            return Results.Ok(task);
        })
        .WithName("GetTaskById");

        tasks.MapPost("/", async ( CreateTaskRequest request, IValidator<CreateTaskRequest> validator, ITaskService taskService) =>
        {
            var validationResult = await validator.ValidateAsync(request);

           if (!validationResult.IsValid)
                {
                    var errors = validationResult
                        .Errors
                        .GroupBy(error => error.PropertyName)
                        .ToDictionary(
                            group => group.Key,
                            group => group
                                .Select(error => error.ErrorMessage)
                                .ToArray());

                    return Results.BadRequest(new ApiErrorResponse
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        Message = "Validation failed.",
                        Errors = errors
                    });
                }

            var task = taskService.CreateTask(request);

            return Results.Created($"/api/tasks/{task.Id}", task);
        })
        .WithName("CreateTask");

        tasks.MapPut("/{id:int}", async ( int id,  UpdateTaskRequest request,  IValidator<UpdateTaskRequest> validator, ITaskService taskService) =>
            {
                var validationResult = await validator.ValidateAsync(request);

                if (!validationResult.IsValid)
                    {
                        var errors = validationResult
                            .Errors
                            .GroupBy(error => error.PropertyName)
                            .ToDictionary(
                                group => group.Key,
                                group => group
                                    .Select(error => error.ErrorMessage)
                                    .ToArray());

                        return Results.BadRequest(new ApiErrorResponse
                        {
                            StatusCode = StatusCodes.Status400BadRequest,
                            Message = "Validation failed.",
                            Errors = errors
                        });
                    }

                var updated = taskService.UpdateTask(id, request);

                if (!updated)
                    {
                        return Results.NotFound(new ApiErrorResponse
                        {
                            StatusCode = StatusCodes.Status404NotFound,
                            Message = $"Task with id {id} was not found."
                        });
                    }

                return Results.NoContent();
            })
        .WithName("UpdateTask");

        tasks.MapDelete("/{id:int}", (int id,ITaskService taskService) => {
            var deleted = taskService.DeleteTask(id);

            if (!deleted)
                {
                    return Results.NotFound(new ApiErrorResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = $"Task with id {id} was not found."
                    });
                }

            return Results.NoContent();
        })
        .WithName("DeleteTask");
    }
}