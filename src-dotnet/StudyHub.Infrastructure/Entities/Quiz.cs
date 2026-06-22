using StudyHub.Domain.Enums;

namespace StudyHub.Infrastructure.Entities;

public class Quiz
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public int DurationMinutes { get; set; }
    public bool IsOneTime { get; set; } = true;
    public int CourseId { get; set; }
    public Course Course { get; set; } = null!;

    public ICollection<Question> Questions { get; set; } = new List<Question>();
    public ICollection<StudentTask> StudentTasks { get; set; } = new List<StudentTask>();
}
