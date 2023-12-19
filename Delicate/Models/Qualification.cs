namespace Delicate.Models
{
    public class Qualification
    {
        public int QualificationId { get; set; }
        public string Degree { get; set; }
        public string Institution { get; set; }

        public int EmployeeId { get; set; } // Foreign key
        public Employee Employee { get; set; }
    }
}
