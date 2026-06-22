using System.Runtime.Serialization;

namespace StudyHub.Domain.Enums;

public enum QuestionType
{
    [EnumMember(Value = "Одиночный выбор")]
    SingleChoice = 1,
    
    [EnumMember(Value = "Множественный выбор")]
    MultipleChoice = 2,
    
    [EnumMember(Value = "Текстовый ответ")]
    TextAnswer = 3
}