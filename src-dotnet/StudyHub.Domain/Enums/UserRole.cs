using System.Runtime.Serialization;

namespace StudyHub.Domain.Enums;

public enum UserRole
{
    [EnumMember(Value = "Преподаватель")]
    Teacher = 1,
    
    [EnumMember(Value = "Студент")]
    Student = 2
}