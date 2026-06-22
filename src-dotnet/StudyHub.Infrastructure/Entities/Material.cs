using StudyHub.Domain.Enums;

namespace StudyHub.Infrastructure.Entities;

public class Material
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public MaterialType Type { get; set; }
    public string Content { get; set; } = string.Empty;
    public int CourseId { get; set; }
    public Course Course { get; set; } = null!;
}
