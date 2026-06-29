using StudyHub.Infrastructure.Entities;

namespace StudyHub.Infrastructure.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByLoginAsync(string login);
    Task<IEnumerable<User>> GetStudentsAsync(int? groupId = null);
    Task<User?> GetByIdAsync(int id);
    Task AddAsync(User user);
    void Update(User user);
    void Delete(User user);
    Task<IEnumerable<User>> GetByGroupIdAsync(int groupId);
    Task SaveChangesAsync();
}