using StudyHub.Application.DTOs;

namespace StudyHub.Application.Interfaces;

public interface IQuizService
{
    Task<IEnumerable<QuizResponseDto>> GetAllQuizzesAsync();
    Task<QuizResponseDto?> GetQuizByIdAsync(int id);
    Task<QuizResponseDto> CreateQuizAsync(CreateQuizDto dto);
    Task<QuizResponseDto?> UpdateQuizAsync(int id, UpdateQuizDto dto);
    Task<bool> DeleteQuizAsync(int id);
}