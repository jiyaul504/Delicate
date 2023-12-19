namespace Delicate.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public List<Qualification> Qualifications { get; set; }
    }
}
