namespace StudyHub.Application.DTOs;

public class StudentResponseDto
{
    public int Id { get; init; }
    public string FirstName { get; init; } = string.Empty;
    public string LastName { get; init; } = string.Empty;
    public string? Patronymic { get; init; }
    public string Login { get; init; } = string.Empty;
    public int? GroupId { get; init; }
    public string? GroupName { get; init; }
}

public class CreateStudentDto
{
    public string FirstName { get; init; } = string.Empty;
    public string LastName { get; init; } = string.Empty;
    public string? Patronymic { get; init; }
    public string Login { get; init; } = string.Empty;
    public string Password { get; init; } = string.Empty;
    public int? GroupId { get; init; }
}

public class UpdateStudentDto
{
    public string FirstName { get; init; } = string.Empty;
    public string LastName { get; init; } = string.Empty;
    public string? Patronymic { get; init; }
    public int? GroupId { get; init; }
}