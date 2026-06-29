using Microsoft.EntityFrameworkCore;
using StudyHub.Infrastructure.Data;
using StudyHub.Infrastructure.Entities;
using StudyHub.Infrastructure.Interfaces;

namespace StudyHub.Infrastructure.Repositories;

public class StudentSelectedOptionRepository : IStudentSelectedOptionRepository
{
    private readonly AppDbContext _context;

    public StudentSelectedOptionRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(StudentSelectedOption selectedOption)
    {
        await _context.StudentSelectedOptions.AddAsync(selectedOption);
    }

    public async Task AddRangeAsync(IEnumerable<StudentSelectedOption> selectedOptions)
    {
        await _context.StudentSelectedOptions.AddRangeAsync(selectedOptions);
    }

    public async Task<IEnumerable<StudentSelectedOption>> GetByStudentAnswerIdAsync(int studentAnswerId)
    {
        return await _context.StudentSelectedOptions
            .Where(option => option.StudentAnswerId == studentAnswerId)
            .ToListAsync();
    }

    public void DeleteRange(IEnumerable<StudentSelectedOption> selectedOptions)
    {
        _context.StudentSelectedOptions.RemoveRange(selectedOptions);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }

    public async Task DeleteByStudentAnswerIdAsync(int studentAnswerId)
    {
        List<StudentSelectedOption> selectedOptions =
            await _context.StudentSelectedOptions
                .Where(option => option.StudentAnswerId == studentAnswerId)
                .ToListAsync();

        _context.StudentSelectedOptions.RemoveRange(selectedOptions);
    }
}