using StudyHub.Infrastructure.Entities;

namespace StudyHub.Infrastructure.Interfaces;

public interface IStudentAnswerRepository
{
    Task<StudentAnswer?> GetByIdAsync(int id);
    Task<StudentAnswer?> GetByQuestionAsync(int studentTaskId, int questionId);
    Task<IEnumerable<StudentAnswer>> GetByStudentTaskIdAsync(int studentTaskId);
    Task AddAsync(StudentAnswer studentAnswer);
    Task AddRangeAsync(IEnumerable<StudentAnswer> studentAnswers);
    void Update(StudentAnswer studentAnswer);
    void Delete(StudentAnswer studentAnswer);
    Task SaveChangesAsync();
}