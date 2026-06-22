using Microsoft.AspNetCore.Mvc;
using StudyHub.Application.Constants;
using StudyHub.Application.DTOs;
using StudyHub.Application.Interfaces;

namespace StudyHub.API.Controllers;

[ApiController]
[Route("api/courses")]
public class CoursesController : ControllerBase
{
    private readonly ICourseService _courseService;

    public CoursesController(ICourseService courseService)
    {
        _courseService = courseService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CourseResponseDto>>> GetAll()
    {
        IEnumerable<CourseResponseDto> courses = await _courseService.GetAllCoursesAsync();
        return Ok(courses);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CourseResponseDto>> GetById(int id)
    {
        CourseResponseDto? course = await _courseService.GetCourseByIdAsync(id);
        if (course == null)
            return NotFound(new ErrorResponse { Message = CourseMessages.NotFound });
        return Ok(course);
    }

    [HttpPost]
    public async Task<ActionResult<CourseResponseDto>> Create([FromBody] CreateCourseDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        CourseResponseDto created = await _courseService.CreateCourseAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<CourseResponseDto>> Update(int id, [FromBody] UpdateCourseDto dto)
    {
        CourseResponseDto? updated = await _courseService.UpdateCourseAsync(id, dto);
        if (updated == null)
            return NotFound(new ErrorResponse { Message = CourseMessages.NotFound });
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        bool deleted = await _courseService.DeleteCourseAsync(id);
        if (!deleted)
            return NotFound(new ErrorResponse { Message = CourseMessages.NotFound });
        return NoContent();
    }
}