using StudyHub.Application.DTOs;
using StudyHub.Application.Interfaces;
using StudyHub.Infrastructure.Entities;
using StudyHub.Infrastructure.Interfaces;

namespace StudyHub.Application.Services;

public class CourseService : ICourseService
{
    private readonly ICourseRepository _courseRepository;

    public CourseService(ICourseRepository courseRepository)
    {
        _courseRepository = courseRepository;
    }

    public async Task<IEnumerable<CourseResponseDto>> GetAllCoursesAsync()
    {
        IEnumerable<Course> courses = await _courseRepository.GetAllAsync();
        return courses.Select(c => new CourseResponseDto
        {
            Id = c.Id,
            Name = c.Name,
            Description = c.Description,
            IsActive = c.IsActive
        });
    }

    public async Task<CourseResponseDto?> GetCourseByIdAsync(int id)
    {
        Course? course = await _courseRepository.GetByIdAsync(id);
        if (course == null) return null;
        return new CourseResponseDto
        {
            Id = course.Id,
            Name = course.Name,
            Description = course.Description,
            IsActive = course.IsActive
        };
    }

    public async Task<CourseResponseDto> CreateCourseAsync(CreateCourseDto dto)
    {
        Course course = new Course
        {
            Name = dto.Name,
            Description = dto.Description,
            IsActive = dto.IsActive
        };
        await _courseRepository.AddAsync(course);
        await _courseRepository.SaveChangesAsync();
        return new CourseResponseDto
        {
            Id = course.Id,
            Name = course.Name,
            Description = course.Description,
            IsActive = course.IsActive
        };
    }

    public async Task<CourseResponseDto?> UpdateCourseAsync(int id, UpdateCourseDto dto)
    {
        Course? course = await _courseRepository.GetByIdAsync(id);
        if (course == null) return null;
        course.Name = dto.Name;
        course.Description = dto.Description;
        course.IsActive = dto.IsActive;
        _courseRepository.Update(course);
        await _courseRepository.SaveChangesAsync();
        return new CourseResponseDto
        {
            Id = course.Id,
            Name = course.Name,
            Description = course.Description,
            IsActive = course.IsActive
        };
    }

    public async Task<bool> DeleteCourseAsync(int id)
    {
        Course? course = await _courseRepository.GetByIdAsync(id);
        if (course == null) return false;
        _courseRepository.Delete(course);
        await _courseRepository.SaveChangesAsync();
        return true;
    }
}