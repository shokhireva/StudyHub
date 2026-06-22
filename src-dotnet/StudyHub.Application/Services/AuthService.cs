using StudyHub.Application.DTOs;
using StudyHub.Application.Interfaces;
using StudyHub.Infrastructure.Entities;
using StudyHub.Infrastructure.Interfaces;

namespace StudyHub.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;

    public AuthService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<UserResponse?> LoginAsync(string login, string password)
    {
        User? user = await _userRepository.GetByLoginAsync(login);
        if (user == null || user.PasswordHash != password)
            return null;

        return new UserResponse
        {
            Id = user.Id,
            FullName = user.FullName,
            Role = user.Role
        };
    }
}