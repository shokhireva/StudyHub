using StudyHub.Application.DTOs;
using StudyHub.Domain.Enums;

namespace StudyHub.Application.Interfaces;

public interface IStudentTaskService
{
    Task<StudentTaskResponseDto?> GetByIdAsync(int id);
    Task<IEnumerable<StudentTaskResponseDto>> GetAllAsync();
    Task<IEnumerable<StudentTaskResponseDto>> GetStudentTasksAsync(int studentId);
    Task<IEnumerable<StudentTaskResponseDto>> GetGroupTasksAsync(int groupId);
    Task<IEnumerable<StudentTaskResponseDto>> GetTasksByStatusAsync(StudentTaskStatus status);
    Task AssignToStudentAsync(AssignTaskToStudentDto dto);
    Task AssignToGroupAsync(AssignTaskToGroupDto dto);
    Task CompleteTaskAsync(CompleteStudentTaskDto dto);
    Task DeleteAsync(int id);
}