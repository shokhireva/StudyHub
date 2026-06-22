using Microsoft.EntityFrameworkCore;
using StudyHub.Domain.Entities;
using StudyHub.Domain.Interfaces;
using StudyHub.Infrastructure.Data;

namespace StudyHub.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetByLoginAsync(string login)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.Login == login);
    }
}