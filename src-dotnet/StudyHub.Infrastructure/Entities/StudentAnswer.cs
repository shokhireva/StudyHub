using StudyHub.Domain.Enums;

namespace StudyHub.Infrastructure.Entities;

public class StudentAnswer
{
    public int Id { get; set; }
    public int StudentTaskId { get; set; }
    public StudentTask StudentTask { get; set; } = null!;
    public int QuestionId { get; set; }
    public Question Question { get; set; } = null!;
    public string? AnswerText { get; set; }
    public int? SelectedOptionId { get; set; }
}
