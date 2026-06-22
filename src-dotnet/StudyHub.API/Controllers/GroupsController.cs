using Microsoft.AspNetCore.Mvc;
using StudyHub.Application.Constants;
using StudyHub.Application.DTOs;
using StudyHub.Application.Interfaces;

namespace StudyHub.API.Controllers;

[ApiController]
[Route("api/groups")]
public class GroupsController : ControllerBase
{
    private readonly IGroupService _groupService;

    public GroupsController(IGroupService groupService)
    {
        _groupService = groupService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<GroupResponseDto>>> GetAll()
    {
        var groups = await _groupService.GetAllGroupsAsync();
        return Ok(groups);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<GroupResponseDto>> GetById(int id)
    {
        var group = await _groupService.GetGroupByIdAsync(id);
        if (group == null)
            return NotFound(new ErrorResponse { Message = GroupMessages.NotFound });
        return Ok(group);
    }

    [HttpPost]
    public async Task<ActionResult<GroupResponseDto>> Create([FromBody] CreateGroupDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        var created = await _groupService.CreateGroupAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<GroupResponseDto>> Update(int id, [FromBody] UpdateGroupDto dto)
    {
        var updated = await _groupService.UpdateGroupAsync(id, dto);
        if (updated == null)
            return NotFound(new ErrorResponse { Message = GroupMessages.NotFound });
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _groupService.DeleteGroupAsync(id);
        if (!deleted)
            return NotFound(new ErrorResponse { Message = GroupMessages.NotFound });
        return NoContent();
    }
}