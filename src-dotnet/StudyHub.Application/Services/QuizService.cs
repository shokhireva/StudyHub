using StudyHub.Application.DTOs;
using StudyHub.Application.Interfaces;
using StudyHub.Infrastructure.Entities;
using StudyHub.Infrastructure.Interfaces;

namespace StudyHub.Application.Services;

public class QuizService : IQuizService
{
    private readonly IQuizRepository _quizRepository;

    public QuizService(IQuizRepository quizRepository)
    {
        _quizRepository = quizRepository;
    }

    public async Task<IEnumerable<QuizResponseDto>> GetAllQuizzesAsync()
    {
        IEnumerable<Quiz> quizzes = await _quizRepository.GetAllAsync();
        return quizzes.Select(MapToResponse);
    }

    public async Task<QuizResponseDto?> GetQuizByIdAsync(int id)
    {
        Quiz? quiz = await _quizRepository.GetByIdAsync(id);
        return quiz == null ? null : MapToResponse(quiz);
    }

    public async Task<QuizResponseDto> CreateQuizAsync(CreateQuizDto dto)
    {
        Quiz quiz = new Quiz
        {
            Title = dto.Title,
            DurationMinutes = dto.DurationMinutes,
            IsOneTime = dto.IsOneTime,
            CourseId = dto.CourseId
        };

        await _quizRepository.AddAsync(quiz);
        await _quizRepository.SaveChangesAsync();
        return MapToResponse(quiz);
    }

    public async Task<QuizResponseDto?> UpdateQuizAsync(int id, UpdateQuizDto dto)
    {
        Quiz? quiz = await _quizRepository.GetByIdAsync(id);
        if (quiz == null) return null;

        quiz.Title = dto.Title;
        quiz.DurationMinutes = dto.DurationMinutes;
        quiz.IsOneTime = dto.IsOneTime;
        quiz.CourseId = dto.CourseId;

        _quizRepository.Update(quiz);
        await _quizRepository.SaveChangesAsync();
        return MapToResponse(quiz);
    }

    public async Task<bool> DeleteQuizAsync(int id)
    {
        Quiz? quiz = await _quizRepository.GetByIdAsync(id);
        if (quiz == null) return false;
        _quizRepository.Delete(quiz);
        await _quizRepository.SaveChangesAsync();
        return true;
    }

    private static QuizResponseDto MapToResponse(Quiz quiz)
    {
        return new QuizResponseDto
        {
            Id = quiz.Id,
            Title = quiz.Title,
            DurationMinutes = quiz.DurationMinutes,
            IsOneTime = quiz.IsOneTime,
            CourseId = quiz.CourseId
        };
    }
}