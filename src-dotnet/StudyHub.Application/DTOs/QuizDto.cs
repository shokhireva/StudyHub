namespace StudyHub.Application.DTOs;

public class QuizResponseDto
{
    public int Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public int DurationMinutes { get; init; }
    public bool IsOneTime { get; init; }
    public int CourseId { get; init; }
}

public class CreateQuizDto
{
    public string Title { get; init; } = string.Empty;
    public int DurationMinutes { get; init; }
    public bool IsOneTime { get; init; } = true;
    public int CourseId { get; init; }
}

public class UpdateQuizDto
{
    public string Title { get; init; } = string.Empty;
    public int DurationMinutes { get; init; }
    public bool IsOneTime { get; init; }
    public int CourseId { get; init; }
}