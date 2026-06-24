using StudyHub.Infrastructure.Data;

namespace StudyHub.Infrastructure.Repositories;

public abstract class BaseRepository
{
    protected readonly AppDbContext _context;

    protected BaseRepository(AppDbContext context)
    {
        _context = context;
    }
}