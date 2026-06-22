using StudyHub.Domain.Enums;

namespace StudyHub.Infrastructure.Entities;

public class Question
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public QuestionType Type { get; set; }
    public int QuizId { get; set; }
    public Quiz Quiz { get; set; } = null!;

    public ICollection<AnswerOption> Options { get; set; } = new List<AnswerOption>();
    public ICollection<StudentAnswer> StudentAnswers { get; set; } = new List<StudentAnswer>();
}
