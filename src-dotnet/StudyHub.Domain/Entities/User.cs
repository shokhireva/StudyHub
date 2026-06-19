using StudyHub.Domain.Enums;

namespace StudyHub.Domain.Entities;

public class User
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? Patronymic { get; set; } 
    public string Login { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public UserRole Role { get; set; }
    public int? GroupId { get; set; }
    public Group? Group { get; set; }

    public ICollection<StudentTask> StudentTasks { get; set; } = new List<StudentTask>();

    public string FullName => $"{LastName} {FirstName} {Patronymic}".Trim();
}