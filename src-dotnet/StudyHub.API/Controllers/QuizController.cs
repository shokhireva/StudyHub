using Microsoft.AspNetCore.Mvc;
using StudyHub.Application.Constants;
using StudyHub.Application.DTOs;
using StudyHub.Application.Interfaces;

namespace StudyHub.API.Controllers;

[ApiController]
[Route("api/quizzes")]
public class QuizController : ControllerBase
{
    private readonly IQuizService _quizService;

    public QuizController(IQuizService quizService)
    {
        _quizService = quizService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<QuizResponseDto>>> GetAll()
    {
        IEnumerable<QuizResponseDto> quizzes = await _quizService.GetAllQuizzesAsync();
        return Ok(quizzes);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<QuizResponseDto>> GetById(int id)
    {
        QuizResponseDto? quiz = await _quizService.GetQuizByIdAsync(id);
        if (quiz == null)
        {
            return NotFound(new ErrorResponse { Message = QuizMessages.NotFound });
        }
        return Ok(quiz);
    }

    [HttpPost]
    public async Task<ActionResult<QuizResponseDto>> Create([FromBody] CreateQuizDto dto)
    {
        QuizResponseDto created = await _quizService.CreateQuizAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<QuizResponseDto>> Update(int id, [FromBody] UpdateQuizDto dto)
    {
        QuizResponseDto? updated = await _quizService.UpdateQuizAsync(id, dto);
        if (updated == null)
        {
            return NotFound(new ErrorResponse { Message = QuizMessages.NotFound });
        }
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        bool deleted = await _quizService.DeleteQuizAsync(id);
        if (!deleted)
        {
            return NotFound(new ErrorResponse { Message = QuizMessages.NotFound });
        }
        return NoContent();
    }
}