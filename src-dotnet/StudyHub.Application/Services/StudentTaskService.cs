using StudyHub.Application.DTOs;
using StudyHub.Application.Interfaces;
using StudyHub.Domain.Enums;
using StudyHub.Infrastructure.Entities;
using StudyHub.Infrastructure.Interfaces;
using StudyHub.Application.Constants;

namespace StudyHub.Application.Services;

public class StudentTaskService : IStudentTaskService
{
    private readonly IStudentTaskRepository _studentTaskRepository;
    private readonly IUserRepository _userRepository;
    private readonly IGroupRepository _groupRepository;
    private readonly IQuizRepository _quizRepository;
    private readonly IStudentAnswerRepository _studentAnswerRepository;
    private readonly IStudentSelectedOptionRepository _studentSelectedOptionRepository;


    public StudentTaskService(
        IStudentTaskRepository studentTaskRepository,
        IUserRepository userRepository,
        IGroupRepository groupRepository,
        IQuizRepository quizRepository,
        IStudentAnswerRepository studentAnswerRepository,
        IStudentSelectedOptionRepository studentSelectedOptionRepository)
    {
        _studentTaskRepository = studentTaskRepository;
        _userRepository = userRepository;
        _groupRepository = groupRepository;
        _quizRepository = quizRepository;
        _studentAnswerRepository = studentAnswerRepository;
        _studentSelectedOptionRepository = studentSelectedOptionRepository;
    }

    private static StudentTaskResponseDto Map(StudentTask task)
    {
        return new StudentTaskResponseDto
        {
            Id = task.Id,
            StudentId = task.StudentId,
            StudentName =
                $"{task.Student.LastName} {task.Student.FirstName} {task.Student.Patronymic}".Trim(),

            GroupId = task.GroupId,
            GroupName = task.Group?.Name,

            QuizId = task.QuizId,
            QuizTitle = task.Quiz?.Title,

            Status = task.Status,
            Score = task.Score,
            Passed = task.Passed,
            AssignedAt = task.AssignedAt,
            CompletedAt = task.CompletedAt
        };
    }

    public async Task<StudentTaskResponseDto?> GetByIdAsync(int id)
    {
        StudentTask? task = await _studentTaskRepository.GetByIdAsync(id);

        if (task == null)
        {
            return null;
        }

        return Map(task);
    }

    public async Task<IEnumerable<StudentTaskResponseDto>> GetAllAsync()
    {
        IEnumerable<StudentTask> tasks =
            await _studentTaskRepository.GetAllAsync();

        return tasks.Select(Map);
    }

    public async Task<IEnumerable<StudentTaskResponseDto>> GetStudentTasksAsync(int studentId)
    {
        IEnumerable<StudentTask> tasks =
            await _studentTaskRepository.GetByStudentIdAsync(studentId);

        return tasks.Select(Map);
    }

    public async Task<IEnumerable<StudentTaskResponseDto>> GetGroupTasksAsync(int groupId)
    {
        IEnumerable<StudentTask> tasks =
            await _studentTaskRepository.GetFilteredAsync(
                groupId,
                null,
                null);

        return tasks.Select(Map);
    }

    public async Task<IEnumerable<StudentTaskResponseDto>> GetTasksByStatusAsync(StudentTaskStatus status)
    {
        IEnumerable<StudentTask> tasks =
            await _studentTaskRepository.GetFilteredAsync(
                null,
                null,
                status);

        return tasks.Select(Map);
    }

    public async Task AssignToStudentAsync(AssignTaskToStudentDto dto)
    {
        User? student = await _userRepository.GetByIdAsync(dto.StudentId);

        if (student == null)
        {
            throw new InvalidOperationException(StudentTaskMessages.StudentNotFound);
        }

        Quiz? quiz = await _quizRepository.GetByIdAsync(dto.QuizId);

        if (quiz == null)
        {
            throw new InvalidOperationException(StudentTaskMessages.QuizNotFound);
        }

        StudentTask studentTask = new StudentTask
        {
            StudentId = student.Id,
            GroupId = student.GroupId,
            QuizId = quiz.Id,
            Status = StudentTaskStatus.Assigned,
            AssignedAt = DateTime.UtcNow
        };

        await _studentTaskRepository.AddAsync(studentTask);
        await _studentTaskRepository.SaveChangesAsync();
    }

    public async Task AssignToGroupAsync(AssignTaskToGroupDto dto)
    {
        Group? group = await _groupRepository.GetByIdAsync(dto.GroupId);

        if (group == null)
        {
            throw new InvalidOperationException(StudentTaskMessages.GroupNotFound);
        }

        Quiz? quiz = await _quizRepository.GetByIdAsync(dto.QuizId);

        if (quiz == null)
        {
            throw new InvalidOperationException(StudentTaskMessages.QuizNotFound);
        }

        IEnumerable<User> students =
            await _userRepository.GetByGroupIdAsync(dto.GroupId);

        List<StudentTask> studentTasks = students
            .Select(student => new StudentTask
            {
                StudentId = student.Id,
                GroupId = dto.GroupId,
                QuizId = dto.QuizId,
                Status = StudentTaskStatus.Assigned,
                AssignedAt = DateTime.UtcNow
            })
            .ToList();

        await _studentTaskRepository.AddRangeAsync(studentTasks);
        await _studentTaskRepository.SaveChangesAsync();
    }

    public async Task CompleteTaskAsync(CompleteStudentTaskDto dto)
    {
        StudentTask? studentTask =
            await _studentTaskRepository.GetByIdAsync(dto.StudentTaskId);

        if (studentTask == null)
        {
            throw new InvalidOperationException(StudentTaskMessages.NotFound);
        }

        if (studentTask.QuizId == null)
        {
            throw new InvalidOperationException(StudentTaskMessages.QuizNotAssigned);
        }

        Quiz? quiz =
            await _quizRepository.GetWithQuestionsAsync(studentTask.QuizId.Value);

        if (quiz == null)
        {
            throw new InvalidOperationException(StudentTaskMessages.QuizNotFound);
        }

        Int32 checkedQuestions = 0;
        Int32 correctAnswers = 0;

        foreach (SubmitAnswerDto answerDto in dto.Answers)
        {
            Question? question =
                quiz.Questions.FirstOrDefault(q => q.Id == answerDto.QuestionId);

            if (question == null)
            {
                continue;
            }

            StudentAnswer? studentAnswer =
                await _studentAnswerRepository.GetByQuestionAsync(
                    studentTask.Id,
                    question.Id);

            if (studentAnswer == null)
            {
                studentAnswer = new StudentAnswer
                {
                    StudentTaskId = studentTask.Id,
                    QuestionId = question.Id
                };

                await _studentAnswerRepository.AddAsync(studentAnswer);
                await _studentAnswerRepository.SaveChangesAsync();
            }

            if (question.Type == QuestionType.TextAnswer)
            {
                studentAnswer.AnswerText = answerDto.AnswerText;

                _studentAnswerRepository.Update(studentAnswer);

                continue;
            }

            await _studentSelectedOptionRepository
                .DeleteByStudentAnswerIdAsync(studentAnswer.Id);

            List<StudentSelectedOption> selectedOptions =
                new List<StudentSelectedOption>();

            foreach (Int32 optionId in answerDto.SelectedOptionIds)
            {
                selectedOptions.Add(
                    new StudentSelectedOption
                    {
                        StudentAnswerId = studentAnswer.Id,
                        AnswerOptionId = optionId
                    });
            }

            await _studentSelectedOptionRepository
                .AddRangeAsync(selectedOptions);

            List<Int32> correctOptionIds =
                question.Options
                    .Where(o => o.IsCorrect)
                    .Select(o => o.Id)
                    .OrderBy(id => id)
                    .ToList();

            List<Int32> selectedOptionIds =
                answerDto.SelectedOptionIds
                    .OrderBy(id => id)
                    .ToList();

            checkedQuestions++;

            if (correctOptionIds.SequenceEqual(selectedOptionIds))
            {
                correctAnswers++;
            }
        }

        if (checkedQuestions > 0)
        {
            studentTask.Score =
                (Int32)Math.Round(
                    (Double)correctAnswers / checkedQuestions * 100);

            studentTask.Passed = studentTask.Score >= 60;
        }

        studentTask.Status = StudentTaskStatus.Completed;
        studentTask.CompletedAt = DateTime.UtcNow;

        _studentTaskRepository.Update(studentTask);

        await _studentSelectedOptionRepository.SaveChangesAsync();
        await _studentAnswerRepository.SaveChangesAsync();
        await _studentTaskRepository.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        StudentTask? studentTask =
            await _studentTaskRepository.GetByIdAsync(id);

        if (studentTask == null)
        {
            throw new InvalidOperationException(StudentTaskMessages.NotFound);
        }

        _studentTaskRepository.Delete(studentTask);

        await _studentTaskRepository.SaveChangesAsync();
    }
}