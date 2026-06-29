using System.ComponentModel.DataAnnotations;

namespace StudyHub.Application.DTOs;

public class AssignTaskToStudentDto
{
    public int StudentId { get; set; }
    public int QuizId { get; set; }
}