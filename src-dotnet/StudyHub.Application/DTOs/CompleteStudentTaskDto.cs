namespace StudyHub.Application.DTOs;

public class CompleteStudentTaskDto
{
    public int StudentTaskId { get; set; }
    public List<SubmitAnswerDto> Answers { get; set; } = [];
}