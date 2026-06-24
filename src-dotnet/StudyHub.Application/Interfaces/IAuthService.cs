using StudyHub.Application.DTOs;

namespace StudyHub.Application.Interfaces;

public interface IAuthService
{
    Task<UserResponse?> LoginAsync(string login, string password);
    Task<bool> RegisterAsync(RegisterRequest request);
}