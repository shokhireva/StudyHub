using StudyHub.Infrastructure.Entities;

namespace StudyHub.Infrastructure.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByLoginAsync(string login);
}