using Microsoft.EntityFrameworkCore;
using StudyHub.Infrastructure.Data;
using StudyHub.Infrastructure.Entities;
using StudyHub.Infrastructure.Interfaces;

namespace StudyHub.Infrastructure.Repositories;

public class StudentAnswerRepository : IStudentAnswerRepository
{
    private readonly AppDbContext _context;

    public StudentAnswerRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<StudentAnswer?> GetByIdAsync(int id)
    {
        return await _context.StudentAnswers
            .Include(answer => answer.Question)
            .Include(answer => answer.SelectedOptions)
                .ThenInclude(selected => selected.AnswerOption)
            .FirstOrDefaultAsync(answer => answer.Id == id);
    }

    public async Task<StudentAnswer?> GetByQuestionAsync(int studentTaskId, int questionId)
    {
        return await _context.StudentAnswers
            .Include(answer => answer.SelectedOptions)
            .FirstOrDefaultAsync(answer =>
                answer.StudentTaskId == studentTaskId &&
                answer.QuestionId == questionId);
    }

    public async Task<IEnumerable<StudentAnswer>> GetByStudentTaskIdAsync(int studentTaskId)
    {
        return await _context.StudentAnswers
            .Include(answer => answer.Question)
            .Include(answer => answer.SelectedOptions)
                .ThenInclude(selected => selected.AnswerOption)
            .Where(answer => answer.StudentTaskId == studentTaskId)
            .ToListAsync();
    }

    public async Task AddAsync(StudentAnswer studentAnswer)
    {
        await _context.StudentAnswers.AddAsync(studentAnswer);
    }

    public async Task AddRangeAsync(IEnumerable<StudentAnswer> studentAnswers)
    {
        await _context.StudentAnswers.AddRangeAsync(studentAnswers);
    }

    public void Update(StudentAnswer studentAnswer)
    {
        _context.StudentAnswers.Update(studentAnswer);
    }

    public void Delete(StudentAnswer studentAnswer)
    {
        _context.StudentAnswers.Remove(studentAnswer);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}