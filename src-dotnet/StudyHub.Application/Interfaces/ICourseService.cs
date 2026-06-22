using StudyHub.Application.DTOs;

namespace StudyHub.Application.Interfaces;

public interface ICourseService
{
    Task<IEnumerable<CourseResponseDto>> GetAllCoursesAsync();
    Task<CourseResponseDto?> GetCourseByIdAsync(int id);
    Task<CourseResponseDto> CreateCourseAsync(CreateCourseDto dto);
    Task<CourseResponseDto?> UpdateCourseAsync(int id, UpdateCourseDto dto);
    Task<bool> DeleteCourseAsync(int id);
}