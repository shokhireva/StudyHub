using StudyHub.Domain.Enums;

namespace StudyHub.Application.DTOs;

public class StudentTaskFilterDto
{
    public int? StudentId { get; set; }
    public int? GroupId { get; set; }
    public StudentTaskStatus? Status { get; set; }
    public int? QuizId { get; set; }
}