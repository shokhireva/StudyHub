namespace StudyHub.Application.DTOs;

public class ErrorResponse
{
    public string Message { get; set; } = string.Empty;
    public string? Code { get; set; }
}