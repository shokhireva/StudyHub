using Microsoft.AspNetCore.Mvc;
using StudyHub.Application.Constants;
using StudyHub.Application.DTOs;
using StudyHub.Application.Interfaces;

namespace StudyHub.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserResponse>> Login([FromBody] LoginRequest request)
    {
        UserResponse? result = await _authService.LoginAsync(request.Login, request.Password);
        if (result == null)
        {
            return Unauthorized(new ErrorResponse { Message = AuthMessages.InvalidCredentials });
        }
        return Ok(result);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        bool result = await _authService.RegisterAsync(request);
        if (!result)
            return BadRequest(new ErrorResponse { Message = RegistrationMessages.LoginAlreadyExists });

        return Ok(new { message = RegistrationMessages.RegistrationSuccess });
    }   
}