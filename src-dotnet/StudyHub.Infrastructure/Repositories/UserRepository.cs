using Microsoft.EntityFrameworkCore;
using StudyHub.Domain.Enums;
using StudyHub.Infrastructure.Data;
using StudyHub.Infrastructure.Entities;
using StudyHub.Infrastructure.Interfaces;

namespace StudyHub.Infrastructure.Repositories;

public class UserRepository : BaseRepository, IUserRepository
{
    public UserRepository(AppDbContext context) : base(context) { }

    public async Task<User?> GetByLoginAsync(string login)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.Login == login);
    }

    public async Task<IEnumerable<User>> GetStudentsAsync(int? groupId = null)
    {
        IQueryable<User> query = _context.Users
            .Include(u => u.Group)
            .Where(u => u.Role == UserRole.Student);
        if (groupId.HasValue)
            query = query.Where(u => u.GroupId == groupId.Value);
        return await query.ToListAsync();
    }

    public async Task<User?> GetByIdAsync(int id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task AddAsync(User user)
    {
        await _context.Users.AddAsync(user);
    }

    public void Update(User user)
    {
        _context.Users.Update(user);
    }

    public void Delete(User user)
    {
        _context.Users.Remove(user);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<User>> GetByGroupIdAsync(int groupId)
    {
        return await _context.Users
            .Where(user => user.GroupId == groupId)
            .ToListAsync();
    }
}