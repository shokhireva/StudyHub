using Microsoft.EntityFrameworkCore;
using StudyHub.Infrastructure.Data;
using StudyHub.Infrastructure.Entities;
using StudyHub.Infrastructure.Interfaces;

namespace StudyHub.Infrastructure.Repositories;

public class QuizRepository : BaseRepository, IQuizRepository
{
    public QuizRepository(AppDbContext context) : base(context) { }

    public async Task<IEnumerable<Quiz>> GetAllAsync()
    {
        return await _context.Quizzes
            .Include(q => q.Questions)
            .ToListAsync();
    }

    public async Task<Quiz?> GetByIdAsync(int id)
    {
        return await _context.Quizzes
            .Include(q => q.Questions)
            .FirstOrDefaultAsync(q => q.Id == id);
    }
    
    public async Task<Quiz?> GetWithQuestionsAsync(int id)
    {
        return await _context.Quizzes
            .Include(quiz => quiz.Questions)
                .ThenInclude(question => question.Options)
            .FirstOrDefaultAsync(quiz => quiz.Id == id);
    }

    public async Task AddAsync(Quiz quiz)
    {
        await _context.Quizzes.AddAsync(quiz);
    }

    public void Update(Quiz quiz)
    {
        _context.Quizzes.Update(quiz);
    }

    public void Delete(Quiz quiz)
    {
        _context.Quizzes.Remove(quiz);
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _context.Quizzes.AnyAsync(q => q.Id == id);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}