using System.Runtime.Serialization;

namespace StudyHub.Domain.Enums;

public enum MaterialType
{
    [EnumMember(Value = "PDF-файл")]
    Pdf = 1,
    
    [EnumMember(Value = "Текстовая статья")]
    Article = 2,
    
    [EnumMember(Value = "Ссылка на видео")]
    Link = 3
}