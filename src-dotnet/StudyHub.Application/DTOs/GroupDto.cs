namespace StudyHub.Application.DTOs;

public record GroupResponseDto
{
    public int Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public string? Description { get; init; }
}

public record CreateGroupDto
{
    public string Name { get; init; } = string.Empty;
    public string? Description { get; init; }
}

public record UpdateGroupDto
{
    public string Name { get; init; } = string.Empty;
    public string? Description { get; init; }
}