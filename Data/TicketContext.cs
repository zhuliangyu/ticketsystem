using Microsoft.EntityFrameworkCore;
using ticket_system.Models;

namespace ticket_system.Data
{
    public class TicketContext: DbContext
    {
        public TicketContext(DbContextOptions<TicketContext> options) : base(options)
        {
            
        }
        
        public DbSet<Ticket> Tickets { set; get; }
    }
}