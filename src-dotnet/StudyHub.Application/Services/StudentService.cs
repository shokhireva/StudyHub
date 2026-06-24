using StudyHub.Application.DTOs;
using StudyHub.Application.Helpers;
using StudyHub.Application.Interfaces;
using StudyHub.Domain.Enums;
using StudyHub.Infrastructure.Entities;
using StudyHub.Infrastructure.Interfaces;

namespace StudyHub.Application.Services;

public class StudentService : IStudentService
{
    private readonly IUserRepository _userRepository;
    private readonly IGroupRepository _groupRepository;

    public StudentService(IUserRepository userRepository, IGroupRepository groupRepository)
    {
        _userRepository = userRepository;
        _groupRepository = groupRepository;
    }

    public async Task<IEnumerable<StudentResponseDto>> GetAllStudentsAsync(int? groupId = null)
    {
        IEnumerable<User> students = await _userRepository.GetStudentsAsync(groupId);
        return students.Select(s => new StudentResponseDto
        {
            Id = s.Id,
            FirstName = s.FirstName,
            LastName = s.LastName,
            Patronymic = s.Patronymic,
            Login = s.Login,
            GroupId = s.GroupId,
            GroupName = s.Group?.Name
        });
    }

    public async Task<StudentResponseDto?> GetStudentByIdAsync(int id)
    {
        User? student = await _userRepository.GetByIdAsync(id);
        if (student == null || student.Role != UserRole.Student)
            return null;
        return new StudentResponseDto
        {
            Id = student.Id,
            FirstName = student.FirstName,
            LastName = student.LastName,
            Patronymic = student.Patronymic,
            Login = student.Login,
            GroupId = student.GroupId,
            GroupName = student.Group?.Name
        };
    }

    public async Task<StudentResponseDto> CreateStudentAsync(CreateStudentDto dto)
    {
        User? existing = await _userRepository.GetByLoginAsync(dto.Login);
        if (existing != null)
            throw new InvalidOperationException("Пользователь с таким логином уже существует");

        if (dto.GroupId.HasValue && !await _groupRepository.ExistsAsync(dto.GroupId.Value))
            throw new InvalidOperationException("Группа не найдена");

        User student = new User
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Patronymic = dto.Patronymic,
            Login = dto.Login,
            PasswordHash = PasswordHelper.HashPassword(dto.Password),
            Role = UserRole.Student,
            GroupId = dto.GroupId
        };

        await _userRepository.AddAsync(student);
        await _userRepository.SaveChangesAsync();

        return new StudentResponseDto
        {
            Id = student.Id,
            FirstName = student.FirstName,
            LastName = student.LastName,
            Patronymic = student.Patronymic,
            Login = student.Login,
            GroupId = student.GroupId
        };
    }

    public async Task<StudentResponseDto?> UpdateStudentAsync(int id, UpdateStudentDto dto)
    {
        User? student = await _userRepository.GetByIdAsync(id);
        if (student == null || student.Role != UserRole.Student)
            return null;

        if (dto.GroupId.HasValue && !await _groupRepository.ExistsAsync(dto.GroupId.Value))
            throw new InvalidOperationException("Группа не найдена");

        student.FirstName = dto.FirstName;
        student.LastName = dto.LastName;
        student.Patronymic = dto.Patronymic;
        student.GroupId = dto.GroupId;

        _userRepository.Update(student);
        await _userRepository.SaveChangesAsync();

        return new StudentResponseDto
        {
            Id = student.Id,
            FirstName = student.FirstName,
            LastName = student.LastName,
            Patronymic = student.Patronymic,
            Login = student.Login,
            GroupId = student.GroupId,
            GroupName = student.Group?.Name
        };
    }

    public async Task<bool> DeleteStudentAsync(int id)
    {
        User? student = await _userRepository.GetByIdAsync(id);
        if (student == null || student.Role != UserRole.Student)
            return false;
        _userRepository.Delete(student);
        await _userRepository.SaveChangesAsync();
        return true;
    }
}