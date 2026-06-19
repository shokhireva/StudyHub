using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudyHub.Application.DTOs;
using StudyHub.Infrastructure.Data;

namespace StudyHub.API.Controllers;

[ApiController]
[Route("api/students")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;

    public AuthController(AppDbContext db)
    {
        _db = db;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var user = await _db.Users
            .FirstOrDefaultAsync(u => u.Login == request.Login);

        if (user == null || user.PasswordHash != request.Password)
            return Unauthorized(new { message = "Неверный логин или пароль" });

        return Ok(new UserResponse
        {
            Id = user.Id,
            FullName = user.FullName,
            Role = user.Role
        });
    }
}