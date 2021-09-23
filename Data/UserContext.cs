using Microsoft.EntityFrameworkCore;
using ticket_system.Models;

namespace ticket_system.Data
{
    public class UserContext: DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
            
        }
        
        public DbSet<User> Users { set; get; }
        
        // make sure username should be unique
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();
        }
        



    }
}