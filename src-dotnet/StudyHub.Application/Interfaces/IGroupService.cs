using StudyHub.Application.DTOs;

namespace StudyHub.Application.Interfaces;

public interface IGroupService
{
    Task<IEnumerable<GroupResponseDto>> GetAllGroupsAsync();
    Task<GroupResponseDto?> GetGroupByIdAsync(int id);
    Task<GroupResponseDto> CreateGroupAsync(CreateGroupDto dto);
    Task<GroupResponseDto?> UpdateGroupAsync(int id, UpdateGroupDto dto);
    Task<bool> DeleteGroupAsync(int id);
}