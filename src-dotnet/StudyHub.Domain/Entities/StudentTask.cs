using StudyHub.Domain.Enums;

namespace StudyHub.Domain.Entities;

public class StudentTask
{
    public int Id { get; set; }
    public int StudentId { get; set; }
    public User Student { get; set; } = null!;
    public int? QuizId { get; set; }
    public Quiz? Quiz { get; set; }
    public int? GroupId { get; set; }
    public Group? Group { get; set; }
    public StudentTaskStatus Status { get; set; } = StudentTaskStatus.Assigned;
    public int? Score { get; set; }
    public bool? Passed { get; set; }
    public DateTime? CompletedAt { get; set; }
    public DateTime AssignedAt { get; set; } = DateTime.UtcNow;

    public ICollection<StudentAnswer> StudentAnswers { get; set; } = new List<StudentAnswer>();
}