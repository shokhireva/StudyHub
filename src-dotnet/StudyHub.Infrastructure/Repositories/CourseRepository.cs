using Microsoft.EntityFrameworkCore;
using StudyHub.Infrastructure.Data;
using StudyHub.Infrastructure.Entities;
using StudyHub.Infrastructure.Interfaces;

namespace StudyHub.Infrastructure.Repositories;

public class CourseRepository : ICourseRepository
{
    private readonly AppDbContext _context;

    public CourseRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Course>> GetAllAsync()
        => await _context.Courses.ToListAsync();

    public async Task<Course?> GetByIdAsync(int id)
        => await _context.Courses.FindAsync(id);

    public async Task AddAsync(Course course)
        => await _context.Courses.AddAsync(course);

    public void Update(Course course)
        => _context.Courses.Update(course);

    public void Delete(Course course)
        => _context.Courses.Remove(course);

    public async Task<bool> ExistsAsync(int id)
        => await _context.Courses.AnyAsync(c => c.Id == id);

    public async Task SaveChangesAsync()
        => await _context.SaveChangesAsync();
}