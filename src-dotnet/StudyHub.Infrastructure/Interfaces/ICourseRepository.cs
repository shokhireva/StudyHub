using StudyHub.Infrastructure.Entities;

namespace StudyHub.Infrastructure.Interfaces;

public interface ICourseRepository
{
    Task<IEnumerable<Course>> GetAllAsync();
    Task<Course?> GetByIdAsync(int id);
    Task AddAsync(Course course);
    void Update(Course course);
    void Delete(Course course);
    Task<bool> ExistsAsync(int id);
    Task SaveChangesAsync();
}