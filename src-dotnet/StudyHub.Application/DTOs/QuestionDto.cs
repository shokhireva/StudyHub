using StudyHub.Domain.Enums;

namespace StudyHub.Application.DTOs;

public class QuestionResponseDto
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public QuestionType Type { get; set; }
    public int QuizId { get; set; }
    public List<AnswerOptionResponseDto> Options { get; set; } = new();
}

public class CreateQuestionDto
{
    public string Text { get; set; } = string.Empty;
    public QuestionType Type { get; set; }
    public int QuizId { get; set; }
    public List<CreateAnswerOptionDto> Options { get; set; } = new();
}

public class UpdateQuestionDto
{
    public string Text { get; set; } = string.Empty;
    public QuestionType Type { get; set; }
    public int QuizId { get; set; }
    public List<UpdateAnswerOptionDto> Options { get; set; } = new();
}

public class AnswerOptionResponseDto
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public bool IsCorrect { get; set; }
}

public class CreateAnswerOptionDto
{
    public string Text { get; set; } = string.Empty;
    public bool IsCorrect { get; set; }
}

public class UpdateAnswerOptionDto
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public bool IsCorrect { get; set; }
}