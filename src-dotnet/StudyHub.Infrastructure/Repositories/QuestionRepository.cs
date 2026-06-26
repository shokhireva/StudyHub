using Microsoft.EntityFrameworkCore;
using StudyHub.Infrastructure.Data;
using StudyHub.Infrastructure.Entities;
using StudyHub.Infrastructure.Interfaces;

namespace StudyHub.Infrastructure.Repositories;

public class QuestionRepository : BaseRepository, IQuestionRepository
{
    public QuestionRepository(AppDbContext context) : base(context) { }

    public async Task<IEnumerable<Question>> GetAllAsync()
    {
        return await _context.Questions
            .Include(q => q.Options)
            .ToListAsync();
    }

    public async Task<Question?> GetByIdAsync(int id)
    {
        return await _context.Questions
            .Include(q => q.Options)
            .FirstOrDefaultAsync(q => q.Id == id);
    }

    public async Task AddAsync(Question question)
    {
        await _context.Questions.AddAsync(question);
    }

    public void Update(Question question)
    {
        _context.Questions.Update(question);
    }

    public void Delete(Question question)
    {
        _context.Questions.Remove(question);
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _context.Questions.AnyAsync(q => q.Id == id);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}