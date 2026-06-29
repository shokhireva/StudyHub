using StudyHub.Domain.Enums;
using StudyHub.Infrastructure.Entities;

namespace StudyHub.Infrastructure.Interfaces;

public interface IStudentTaskRepository
{
    Task<StudentTask?> GetByIdAsync(int id);
    Task<IEnumerable<StudentTask>> GetAllAsync();
    Task<IEnumerable<StudentTask>> GetByStudentIdAsync(int studentId);
    Task<IEnumerable<StudentTask>> GetFilteredAsync(
        int? groupId,
        int? quizId,
        StudentTaskStatus? status);
    Task AddAsync(StudentTask studentTask);
    Task AddRangeAsync(IEnumerable<StudentTask> studentTasks);
    void Update(StudentTask studentTask);
    void Delete(StudentTask studentTask);
    Task SaveChangesAsync();
}