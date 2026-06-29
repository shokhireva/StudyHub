using Microsoft.EntityFrameworkCore;
using StudyHub.Infrastructure.Entities;

namespace StudyHub.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Group> Groups { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<Material> Materials { get; set; }
    public DbSet<Quiz> Quizzes { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<AnswerOption> AnswerOptions { get; set; }
    public DbSet<StudentTask> StudentTasks { get; set; }
    public DbSet<StudentAnswer> StudentAnswers { get; set; }
    public DbSet<StudentSelectedOption> StudentSelectedOptions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasOne(u => u.Group)
            .WithMany(g => g.Students)
            .HasForeignKey(u => u.GroupId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<StudentTask>()
            .HasOne(st => st.Student)
            .WithMany(u => u.StudentTasks)
            .HasForeignKey(st => st.StudentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<StudentTask>()
            .HasOne(st => st.Quiz)
            .WithMany(q => q.StudentTasks)
            .HasForeignKey(st => st.QuizId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<StudentTask>()
            .HasOne(st => st.Group)
            .WithMany(g => g.StudentTasks)
            .HasForeignKey(st => st.GroupId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Material>()
            .HasOne(m => m.Course)
            .WithMany(c => c.Materials)
            .HasForeignKey(m => m.CourseId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Quiz>()
            .HasOne(q => q.Course)
            .WithMany(c => c.Quizzes)
            .HasForeignKey(q => q.CourseId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Question>()
            .HasOne(q => q.Quiz)
            .WithMany(qz => qz.Questions)
            .HasForeignKey(q => q.QuizId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<AnswerOption>()
            .HasOne(a => a.Question)
            .WithMany(q => q.Options)
            .HasForeignKey(a => a.QuestionId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<StudentAnswer>()
            .HasOne(sa => sa.StudentTask)
            .WithMany(st => st.StudentAnswers)
            .HasForeignKey(sa => sa.StudentTaskId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<StudentAnswer>()
            .HasOne(sa => sa.Question)
            .WithMany(q => q.StudentAnswers)
            .HasForeignKey(sa => sa.QuestionId)
            .OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<StudentSelectedOption>()
            .HasOne(selected => selected.StudentAnswer)
            .WithMany(answer => answer.SelectedOptions)
            .HasForeignKey(selected => selected.StudentAnswerId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<StudentSelectedOption>()
            .HasOne(selected => selected.AnswerOption)
            .WithMany(option => option.StudentSelectedOptions)
            .HasForeignKey(selected => selected.AnswerOptionId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}