using StudyHub.Infrastructure.Entities;

namespace StudyHub.Infrastructure.Interfaces;

public interface IGroupRepository
{
    Task<IEnumerable<Group>> GetAllAsync();
    Task<Group?> GetByIdAsync(int id);
    Task AddAsync(Group group);
    void Update(Group group);
    void Delete(Group group);
    Task<bool> ExistsAsync(int id);
    Task SaveChangesAsync();
}