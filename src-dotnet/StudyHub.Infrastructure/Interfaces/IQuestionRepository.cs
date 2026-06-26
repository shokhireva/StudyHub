using StudyHub.Infrastructure.Entities;

namespace StudyHub.Infrastructure.Interfaces;

public interface IQuestionRepository
{
    Task<IEnumerable<Question>> GetAllAsync();
    Task<Question?> GetByIdAsync(int id);
    Task AddAsync(Question question);
    void Update(Question question);
    void Delete(Question question);
    Task<bool> ExistsAsync(int id);
    Task SaveChangesAsync();
}