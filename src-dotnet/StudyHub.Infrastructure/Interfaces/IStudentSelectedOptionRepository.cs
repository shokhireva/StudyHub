using StudyHub.Infrastructure.Entities;

namespace StudyHub.Infrastructure.Interfaces;

public interface IStudentSelectedOptionRepository
{
    Task AddAsync(StudentSelectedOption selectedOption);
    Task AddRangeAsync(IEnumerable<StudentSelectedOption> selectedOptions);
    Task<IEnumerable<StudentSelectedOption>> GetByStudentAnswerIdAsync(int studentAnswerId);
    void DeleteRange(IEnumerable<StudentSelectedOption> selectedOptions);
    Task SaveChangesAsync();
    Task DeleteByStudentAnswerIdAsync(int studentAnswerId);
}