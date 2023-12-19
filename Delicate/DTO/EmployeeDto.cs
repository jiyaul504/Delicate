namespace Delicate.DTO
{
    public class EmployeeDto
    {
       
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<QualificationDto> Qualifications { get; set; }
    }
}
