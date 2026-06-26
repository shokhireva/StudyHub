using StudyHub.Application.DTOs;

namespace StudyHub.Application.Interfaces;

public interface IQuestionService
{
    Task<IEnumerable<QuestionResponseDto>> GetAllQuestionsAsync();
    Task<QuestionResponseDto?> GetQuestionByIdAsync(int id);
    Task<QuestionResponseDto> CreateQuestionAsync(CreateQuestionDto dto);
    Task<QuestionResponseDto?> UpdateQuestionAsync(int id, UpdateQuestionDto dto);
    Task<bool> DeleteQuestionAsync(int id);
}