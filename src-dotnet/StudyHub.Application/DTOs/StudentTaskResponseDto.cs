using StudyHub.Domain.Enums;

namespace StudyHub.Application.DTOs;

public class StudentTaskResponseDto
{
    public int Id { get; set; }
    public int StudentId { get; set; }
    public string StudentName { get; set; } = string.Empty;
    public int? GroupId { get; set; }
    public string? GroupName { get; set; }
    public int? QuizId { get; set; }
    public string? QuizTitle { get; set; }
    public StudentTaskStatus Status { get; set; }
    public int? Score { get; set; }
    public bool? Passed { get; set; }
    public DateTime AssignedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
}