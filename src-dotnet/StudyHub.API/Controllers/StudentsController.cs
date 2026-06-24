using Microsoft.AspNetCore.Mvc;
using StudyHub.Application.Constants;
using StudyHub.Application.DTOs;
using StudyHub.Application.Interfaces;

namespace StudyHub.API.Controllers;

[ApiController]
[Route("api/students")]
public class StudentsController : ControllerBase
{
    private readonly IStudentService _studentService;

    public StudentsController(IStudentService studentService)
    {
        _studentService = studentService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<StudentResponseDto>>> GetAll([FromQuery] int? groupId)
    {
        IEnumerable<StudentResponseDto> students = await _studentService.GetAllStudentsAsync(groupId);
        return Ok(students);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<StudentResponseDto>> GetById(int id)
    {
        StudentResponseDto? student = await _studentService.GetStudentByIdAsync(id);
        if (student == null)
            return NotFound(new ErrorResponse { Message = StudentMessages.NotFound });
        return Ok(student);
    }

    [HttpPost]
    public async Task<ActionResult<StudentResponseDto>> Create([FromBody] CreateStudentDto dto)
    {
        try
        {
            StudentResponseDto created = await _studentService.CreateStudentAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new ErrorResponse { Message = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<StudentResponseDto>> Update(int id, [FromBody] UpdateStudentDto dto)
    {
        try
        {
            StudentResponseDto? updated = await _studentService.UpdateStudentAsync(id, dto);
            if (updated == null)
                return NotFound(new ErrorResponse { Message = StudentMessages.NotFound });
            return Ok(updated);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new ErrorResponse { Message = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        bool deleted = await _studentService.DeleteStudentAsync(id);
        if (!deleted)
            return NotFound(new ErrorResponse { Message = StudentMessages.NotFound });
        return NoContent();
    }
}