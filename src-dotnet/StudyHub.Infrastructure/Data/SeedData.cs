using StudyHub.Domain.Entities;
using StudyHub.Domain.Enums;

namespace StudyHub.Infrastructure.Data;

public static class SeedData
{
    public static void Initialize(AppDbContext db)
    {
        if (db.Users.Any()) return;

        var teacher = new User
        {
            FirstName = "Преподаватель",
            LastName = "Учитель",
            Login = "teacher",
            PasswordHash = "teacher123",
            Role = UserRole.Teacher
        };

        var group = new Group
        {
            Name = "Группа 1",
            Description = "Основная группа"
        };

        var student1 = new User
        {
            FirstName = "Иван",
            LastName = "Иванов",
            Login = "student1",
            PasswordHash = "student1",
            Role = UserRole.Student,
            Group = group
        };
        var student2 = new User
        {
            FirstName = "Пётр",
            LastName = "Петров",
            Login = "student2",
            PasswordHash = "student2",
            Role = UserRole.Student,
            Group = group
        };
        var student3 = new User
        {
            FirstName = "Мария",
            LastName = "Сидорова",
            Login = "student3",
            PasswordHash = "student3",
            Role = UserRole.Student,
            Group = group
        };

        db.Users.AddRange(teacher, student1, student2, student3);
        db.Groups.Add(group);
        db.SaveChanges();
    }
}