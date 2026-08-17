using FluentValidation;
using TaskManagement.Api.DTOs;

namespace TaskManagement.Api.Validators;

public class UpdateTaskRequestValidator : AbstractValidator<UpdateTaskRequest>
{
    public UpdateTaskRequestValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .WithMessage("Title is required.")
            .MaximumLength(100)
            .WithMessage("Title cannot exceed 100 characters.");

        RuleFor(x => x.Description)
            .MaximumLength(500)
            .WithMessage("Description cannot exceed 500 characters.");

        RuleFor(x => x.Priority)
            .IsInEnum()
            .WithMessage("Invalid priority.");

        RuleFor(x => x.Status)
            .IsInEnum()
            .WithMessage("Invalid status.");

        RuleFor(x => x.DueDate)
            .GreaterThanOrEqualTo(DateTime.Today)
            .When(x => x.DueDate.HasValue)
            .WithMessage("Due date cannot be in the past.");
    }
}
