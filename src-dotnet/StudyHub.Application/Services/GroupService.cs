using StudyHub.Application.DTOs;
using StudyHub.Application.Interfaces;
using StudyHub.Infrastructure.Entities;
using StudyHub.Infrastructure.Interfaces;

namespace StudyHub.Application.Services;

public class GroupService : IGroupService
{
    private readonly IGroupRepository _groupRepository;

    public GroupService(IGroupRepository groupRepository)
    {
        _groupRepository = groupRepository;
    }

    public async Task<IEnumerable<GroupResponseDto>> GetAllGroupsAsync()
    {
        var groups = await _groupRepository.GetAllAsync();
        return groups.Select(g => new GroupResponseDto
        {
            Id = g.Id,
            Name = g.Name,
            Description = g.Description
        });
    }

    public async Task<GroupResponseDto?> GetGroupByIdAsync(int id)
    {
        var group = await _groupRepository.GetByIdAsync(id);
        if (group == null) return null;
        return new GroupResponseDto
        {
            Id = group.Id,
            Name = group.Name,
            Description = group.Description
        };
    }

    public async Task<GroupResponseDto> CreateGroupAsync(CreateGroupDto dto)
    {
        var group = new Group
        {
            Name = dto.Name,
            Description = dto.Description
        };
        await _groupRepository.AddAsync(group);
        await _groupRepository.SaveChangesAsync();
        return new GroupResponseDto
        {
            Id = group.Id,
            Name = group.Name,
            Description = group.Description
        };
    }

    public async Task<GroupResponseDto?> UpdateGroupAsync(int id, UpdateGroupDto dto)
    {
        var group = await _groupRepository.GetByIdAsync(id);
        if (group == null) return null;
        group.Name = dto.Name;
        group.Description = dto.Description;
        _groupRepository.Update(group);
        await _groupRepository.SaveChangesAsync();
        return new GroupResponseDto
        {
            Id = group.Id,
            Name = group.Name,
            Description = group.Description
        };
    }

    public async Task<bool> DeleteGroupAsync(int id)
    {
        var group = await _groupRepository.GetByIdAsync(id);
        if (group == null) return false;
        _groupRepository.Delete(group);
        await _groupRepository.SaveChangesAsync();
        return true;
    }
}