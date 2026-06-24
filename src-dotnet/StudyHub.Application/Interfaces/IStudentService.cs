using StudyHub.Application.DTOs;

namespace StudyHub.Application.Interfaces;

public interface IStudentService
{
    Task<IEnumerable<StudentResponseDto>> GetAllStudentsAsync(int? groupId = null);
    Task<StudentResponseDto?> GetStudentByIdAsync(int id);
    Task<StudentResponseDto> CreateStudentAsync(CreateStudentDto dto);
    Task<StudentResponseDto?> UpdateStudentAsync(int id, UpdateStudentDto dto);
    Task<bool> DeleteStudentAsync(int id);
}