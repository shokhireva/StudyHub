using StudyHub.Application.DTOs;
using StudyHub.Application.Interfaces;
using StudyHub.Infrastructure.Entities;
using StudyHub.Infrastructure.Interfaces;
using StudyHub.Application.Helpers;
using StudyHub.Domain.Enums;

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
        if (user == null)
            return null;

        string hashedPassword = PasswordHelper.HashPassword(password);
        if (user.PasswordHash != hashedPassword)
            return null;

        return new UserResponse
        {
            Id = user.Id,
            FullName = user.FullName,
            Role = user.Role
        };
    }

    public async Task<bool> RegisterAsync(RegisterRequest request)
    {
        User? existingUser = await _userRepository.GetByLoginAsync(request.Login);
        if (existingUser != null)
            return false;

        User user = new User
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Login = request.Login,
            PasswordHash = PasswordHelper.HashPassword(request.Password),
            Role = UserRole.Student,
            GroupId = null
        };

        await _userRepository.AddAsync(user);
        await _userRepository.SaveChangesAsync();
        return true;
    }
}