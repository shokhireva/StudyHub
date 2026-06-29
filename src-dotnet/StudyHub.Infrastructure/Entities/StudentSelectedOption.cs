namespace StudyHub.Infrastructure.Entities;

public class StudentSelectedOption
{
    public int Id { get; set; }
    public int StudentAnswerId { get; set; }
    public StudentAnswer StudentAnswer { get; set; } = null!;
    public int AnswerOptionId { get; set; }
    public AnswerOption AnswerOption { get; set; } = null!;
}