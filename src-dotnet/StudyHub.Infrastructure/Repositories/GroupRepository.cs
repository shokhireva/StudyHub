using Microsoft.EntityFrameworkCore;
using StudyHub.Infrastructure.Data;
using StudyHub.Infrastructure.Entities;
using StudyHub.Infrastructure.Interfaces;

namespace StudyHub.Infrastructure.Repositories;

public class GroupRepository : IGroupRepository
{
    private readonly AppDbContext _context;

    public GroupRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Group>> GetAllAsync()
        => await _context.Groups.ToListAsync();

    public async Task<Group?> GetByIdAsync(int id)
        => await _context.Groups.FindAsync(id);

    public async Task AddAsync(Group group)
        => await _context.Groups.AddAsync(group);

    public void Update(Group group)
        => _context.Groups.Update(group);

    public void Delete(Group group)
        => _context.Groups.Remove(group);

    public async Task<bool> ExistsAsync(int id)
        => await _context.Groups.AnyAsync(g => g.Id == id);

    public async Task SaveChangesAsync()
        => await _context.SaveChangesAsync();
}