using StudyHub.Infrastructure.Entities;

namespace StudyHub.Infrastructure.Interfaces;

public interface IQuizRepository
{
    Task<IEnumerable<Quiz>> GetAllAsync();
    Task<Quiz?> GetByIdAsync(int id);
    Task AddAsync(Quiz quiz);
    void Update(Quiz quiz);
    void Delete(Quiz quiz);
    Task<bool> ExistsAsync(int id);
    Task SaveChangesAsync();
}