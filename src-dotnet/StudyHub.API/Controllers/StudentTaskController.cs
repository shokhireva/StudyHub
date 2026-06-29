using Microsoft.AspNetCore.Mvc;
using StudyHub.Application.Constants;
using StudyHub.Application.DTOs;
using StudyHub.Application.Interfaces;
using StudyHub.Domain.Enums;

namespace StudyHub.API.Controllers;

[ApiController]
[Route("api/student-tasks")]
public class StudentTaskController : ControllerBase
{
    private readonly IStudentTaskService _studentTaskService;

    public StudentTaskController(IStudentTaskService studentTaskService)
    {
        _studentTaskService = studentTaskService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<StudentTaskResponseDto>>> GetAll()
    {
        IEnumerable<StudentTaskResponseDto> tasks =
            await _studentTaskService.GetAllAsync();

        return Ok(tasks);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<StudentTaskResponseDto>> GetById(int id)
    {
        StudentTaskResponseDto? task =
            await _studentTaskService.GetByIdAsync(id);

        if (task == null)
        {
            return NotFound(new ErrorResponse
            {
                Message = StudentTaskMessages.NotFound
            });
        }

        return Ok(task);
    }

    [HttpGet("student/{studentId:int}")]
    public async Task<ActionResult<IEnumerable<StudentTaskResponseDto>>> GetStudentTasks(int studentId)
    {
        IEnumerable<StudentTaskResponseDto> tasks =
            await _studentTaskService.GetStudentTasksAsync(studentId);

        return Ok(tasks);
    }

    [HttpGet("group/{groupId:int}")]
    public async Task<ActionResult<IEnumerable<StudentTaskResponseDto>>> GetGroupTasks(int groupId)
    {
        IEnumerable<StudentTaskResponseDto> tasks =
            await _studentTaskService.GetGroupTasksAsync(groupId);

        return Ok(tasks);
    }

    [HttpGet("status/{status}")]
    public async Task<ActionResult<IEnumerable<StudentTaskResponseDto>>> GetByStatus(StudentTaskStatus status)
    {
        IEnumerable<StudentTaskResponseDto> tasks =
            await _studentTaskService.GetTasksByStatusAsync(status);

        return Ok(tasks);
    }

    [HttpPost("assign/student")]
    public async Task<ActionResult<SuccessResponse>> AssignToStudent(
        [FromBody] AssignTaskToStudentDto dto)
    {
        await _studentTaskService.AssignToStudentAsync(dto);

        return Ok(new SuccessResponse
        {
            Message = StudentTaskMessages.AssignedToStudent
        });
    }

    [HttpPost("assign/group")]
    public async Task<ActionResult<SuccessResponse>> AssignToGroup(
        [FromBody] AssignTaskToGroupDto dto)
    {
        await _studentTaskService.AssignToGroupAsync(dto);

        return Ok(new SuccessResponse
        {
            Message = StudentTaskMessages.AssignedToGroup
        });
    }

    [HttpPost("complete")]
    public async Task<ActionResult<SuccessResponse>> CompleteTask(
        [FromBody] CompleteStudentTaskDto dto)
    {
        await _studentTaskService.CompleteTaskAsync(dto);

        return Ok(new SuccessResponse
        {
            Message = StudentTaskMessages.Completed
        });
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<SuccessResponse>> Delete(int id)
    {
        await _studentTaskService.DeleteAsync(id);

        return Ok(new SuccessResponse
        {
            Message = StudentTaskMessages.Deleted
        });
    }
}