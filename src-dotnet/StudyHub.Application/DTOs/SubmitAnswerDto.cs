namespace StudyHub.Application.DTOs;

public class SubmitAnswerDto
{
    public int QuestionId { get; set; }
    public string? AnswerText { get; set; }
    public List<int> SelectedOptionIds { get; set; } = [];
}