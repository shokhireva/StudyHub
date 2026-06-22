using StudyHub.Domain.Enums;

namespace StudyHub.Infrastructure.Entities;

public class Group
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }

    public ICollection<User> Students { get; set; } = new List<User>();
    public ICollection<StudentTask> StudentTasks { get; set; } = new List<StudentTask>();
}
