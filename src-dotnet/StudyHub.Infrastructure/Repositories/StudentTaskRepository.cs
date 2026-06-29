using Microsoft.EntityFrameworkCore;
using StudyHub.Domain.Enums;
using StudyHub.Infrastructure.Data;
using StudyHub.Infrastructure.Entities;
using StudyHub.Infrastructure.Interfaces;

namespace StudyHub.Infrastructure.Repositories;

public class StudentTaskRepository : IStudentTaskRepository
{
    private readonly AppDbContext _context;

    public StudentTaskRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<StudentTask?> GetByIdAsync(int id)
    {
        return await _context.StudentTasks
            .Include(task => task.Student)
            .Include(task => task.Group)
            .Include(task => task.Quiz)
            .Include(task => task.StudentAnswers)
            .FirstOrDefaultAsync(task => task.Id == id);
    }

    public async Task<IEnumerable<StudentTask>> GetAllAsync()
    {
        return await _context.StudentTasks
            .Include(task => task.Student)
            .Include(task => task.Group)
            .Include(task => task.Quiz)
            .ToListAsync();
    }

    public async Task<IEnumerable<StudentTask>> GetByStudentIdAsync(int studentId)
    {
        return await _context.StudentTasks
            .Include(task => task.Student)
            .Include(task => task.Group)
            .Include(task => task.Quiz)
            .Where(task => task.StudentId == studentId)
            .ToListAsync();
    }

    public async Task<IEnumerable<StudentTask>> GetFilteredAsync(
        int? groupId,
        int? quizId,
        StudentTaskStatus? status)
    {
        IQueryable<StudentTask> query = _context.StudentTasks
            .Include(task => task.Student)
            .Include(task => task.Group)
            .Include(task => task.Quiz);

        if (groupId.HasValue)
        {
            query = query.Where(task => task.GroupId == groupId);
        }

        if (quizId.HasValue)
        {
            query = query.Where(task => task.QuizId == quizId);
        }

        if (status.HasValue)
        {
            query = query.Where(task => task.Status == status);
        }

        return await query.ToListAsync();
    }

    public async Task AddAsync(StudentTask studentTask)
    {
        await _context.StudentTasks.AddAsync(studentTask);
    }

    public async Task AddRangeAsync(IEnumerable<StudentTask> studentTasks)
    {
        await _context.StudentTasks.AddRangeAsync(studentTasks);
    }

    public void Update(StudentTask studentTask)
    {
        _context.StudentTasks.Update(studentTask);
    }

    public void Delete(StudentTask studentTask)
    {
        _context.StudentTasks.Remove(studentTask);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}