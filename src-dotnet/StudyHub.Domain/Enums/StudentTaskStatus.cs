using System.Runtime.Serialization;

namespace StudyHub.Domain.Enums;

public enum StudentTaskStatus
{
    [EnumMember(Value = "Назначено")]
    Assigned = 1,
    
    [EnumMember(Value = "В процессе")]
    InProgress = 2,
    
    [EnumMember(Value = "Завершено")]
    Completed = 3
}