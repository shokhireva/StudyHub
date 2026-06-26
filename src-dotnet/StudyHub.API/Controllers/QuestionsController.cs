using Microsoft.AspNetCore.Mvc;
using StudyHub.Application.Constants;
using StudyHub.Application.DTOs;
using StudyHub.Application.Interfaces;

namespace StudyHub.API.Controllers;

[ApiController]
[Route("api/questions")]
public class QuestionsController : ControllerBase
{
    private readonly IQuestionService _questionService;

    public QuestionsController(IQuestionService questionService)
    {
        _questionService = questionService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<QuestionResponseDto>>> GetAll()
    {
        IEnumerable<QuestionResponseDto> questions = await _questionService.GetAllQuestionsAsync();
        return Ok(questions);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<QuestionResponseDto>> GetById(int id)
    {
        QuestionResponseDto? question = await _questionService.GetQuestionByIdAsync(id);
        if (question == null)
        {
            return NotFound(new ErrorResponse { Message = QuestionMessages.NotFound });
        }
        return Ok(question);
    }

    [HttpPost]
    public async Task<ActionResult<QuestionResponseDto>> Create([FromBody] CreateQuestionDto dto)
    {
        QuestionResponseDto created = await _questionService.CreateQuestionAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<QuestionResponseDto>> Update(int id, [FromBody] UpdateQuestionDto dto)
    {
        QuestionResponseDto? updated = await _questionService.UpdateQuestionAsync(id, dto);
        if (updated == null)
        {
            return NotFound(new ErrorResponse { Message = QuestionMessages.NotFound });
        }
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        bool deleted = await _questionService.DeleteQuestionAsync(id);
        if (!deleted)
        {
            return NotFound(new ErrorResponse { Message = QuestionMessages.NotFound });
        }
        return NoContent();
    }
}