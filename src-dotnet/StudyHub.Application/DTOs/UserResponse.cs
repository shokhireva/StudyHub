using StudyHub.Domain.Enums;

namespace StudyHub.Application.DTOs;

public class UserResponse
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public UserRole Role { get; set; }
}