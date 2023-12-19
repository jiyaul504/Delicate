using Microsoft.EntityFrameworkCore;

namespace Delicate.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Qualification> Qualifications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Qualification>()
                .HasOne(q => q.Employee)
                .WithMany(e => e.Qualifications)
                .HasForeignKey(q => q.EmployeeId);
        }
    }
}
