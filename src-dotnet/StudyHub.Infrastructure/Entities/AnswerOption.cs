using StudyHub.Domain.Enums;

namespace StudyHub.Infrastructure.Entities;

public class AnswerOption
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public bool IsCorrect { get; set; }
    public int QuestionId { get; set; }
    public Question Question { get; set; } = null!;
    public ICollection<StudentSelectedOption> StudentSelectedOptions { get; set; } = new List<StudentSelectedOption>();
}