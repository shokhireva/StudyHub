using StudyHub.Application.DTOs;
using StudyHub.Application.Interfaces;
using StudyHub.Infrastructure.Entities;
using StudyHub.Infrastructure.Interfaces;
using StudyHub.Domain.Enums;

namespace StudyHub.Application.Services;

public class QuestionService : IQuestionService
{
    private readonly IQuestionRepository _questionRepository;

    public QuestionService(IQuestionRepository questionRepository)
    {
        _questionRepository = questionRepository;
    }

    public async Task<IEnumerable<QuestionResponseDto>> GetAllQuestionsAsync()
    {
        IEnumerable<Question> questions = await _questionRepository.GetAllAsync();
        return questions.Select((Question q) => MapToResponse(q));
    }

    public async Task<QuestionResponseDto?> GetQuestionByIdAsync(int id)
    {
        Question? question = await _questionRepository.GetByIdAsync(id);
        return question == null ? null : MapToResponse(question);
    }

    public async Task<QuestionResponseDto> CreateQuestionAsync(CreateQuestionDto dto)
    {
        Question question = new Question
        {
            Text = dto.Text,
            Type = dto.Type,
            QuizId = dto.QuizId,
            Options = dto.Options.Select((CreateAnswerOptionDto o) => new AnswerOption
            {
                Text = o.Text,
                IsCorrect = o.IsCorrect
            }).ToList()
        };

        await _questionRepository.AddAsync(question);
        await _questionRepository.SaveChangesAsync();
        return MapToResponse(question);
    }

    public async Task<QuestionResponseDto?> UpdateQuestionAsync(int id, UpdateQuestionDto dto)
    {
        Question? question = await _questionRepository.GetByIdAsync(id);
        if (question == null) return null;

        question.Text = dto.Text;
        question.Type = dto.Type;
        question.QuizId = dto.QuizId;


        question.Options.Clear();
        foreach (UpdateAnswerOptionDto optDto in dto.Options)
        {
            question.Options.Add(new AnswerOption
            {
                Text = optDto.Text,
                IsCorrect = optDto.IsCorrect
            });
        }

        _questionRepository.Update(question);
        await _questionRepository.SaveChangesAsync();
        return MapToResponse(question);
    }

    public async Task<bool> DeleteQuestionAsync(int id)
    {
        Question? question = await _questionRepository.GetByIdAsync(id);
        if (question == null) return false;
        _questionRepository.Delete(question);
        await _questionRepository.SaveChangesAsync();
        return true;
    }

    private static QuestionResponseDto MapToResponse(Question q)
    {
        return new QuestionResponseDto
        {
            Id = q.Id,
            Text = q.Text,
            Type = q.Type,
            QuizId = q.QuizId,
            Options = q.Options.Select((AnswerOption o) => new AnswerOptionResponseDto
            {
                Id = o.Id,
                Text = o.Text,
                IsCorrect = o.IsCorrect
            }).ToList()
        };
    }
}