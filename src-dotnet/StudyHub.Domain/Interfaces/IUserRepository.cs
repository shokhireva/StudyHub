using StudyHub.Domain.Entities;

namespace StudyHub.Domain.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByLoginAsync(string login);
}