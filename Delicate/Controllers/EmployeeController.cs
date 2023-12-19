using Delicate.DTO;
using Delicate.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Delicate.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/employees
        [HttpGet]
        public ActionResult<IEnumerable<EmployeeDto>> GetEmployees()
        {
            var employees = _context.Employees
                .Include(e => e.Qualifications)
                .ToList();

            var employeeDtos = employees.Select(employee => new EmployeeDto
            {
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Qualifications = employee.Qualifications
                    .Select(q => new QualificationDto
                    {
                        Degree = q.Degree,
                        Institution = q.Institution,
                       
                    })
                    .ToList()
            });

            return Ok(employeeDtos);
        }

        // GET: api/employees/{id}
        [HttpGet("{id}")]
        public ActionResult<EmployeeDto> GetEmployee(int id)
        {
            var employee = _context.Employees
                .Include(e => e.Qualifications)
                .FirstOrDefault(e => e.EmployeeId == id);

            if (employee == null)
            {
                return NotFound();
            }

            var employeeDto = new EmployeeDto
            {
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Qualifications = employee.Qualifications
                    .Select(q => new QualificationDto
                    {
                        Degree = q.Degree,
                        Institution = q.Institution,
                       
                    })
                    .ToList()
            };

            return Ok(employeeDto);
        }

        // POST: api/employees
        [HttpPost]
        public ActionResult<EmployeeDto> PostEmployee(EmployeeDto employeeDto)
        {
            var employee = new Employee
            {
                FirstName = employeeDto.FirstName,
                LastName = employeeDto.LastName,
               

                Qualifications = employeeDto.Qualifications
                    .Select(q => new Qualification
                    {
                        Degree = q.Degree,
                        Institution = q.Institution,
                       
                    })
                    .ToList()
            };

            _context.Employees.Add(employee);
            _context.SaveChanges();

            var responseDto = new EmployeeDto
            {
                FirstName = employee.FirstName,
                LastName = employee.LastName,
               

                Qualifications = employee.Qualifications
                    .Select(q => new QualificationDto
                    {
                        Degree = q.Degree,
                        Institution = q.Institution,
                        
                    })
                    .ToList()
            };

            return CreatedAtAction(nameof(GetEmployee), new { id = employee.EmployeeId }, responseDto);
        }

        // PUT: api/employees/{id}
        [HttpPut("{id}")]
        public IActionResult PutEmployee(int id, EmployeeDto employeeDto)
        {
            var employee = _context.Employees.Include(e => e.Qualifications).FirstOrDefault(e => e.EmployeeId == id);

            if (employee == null)
            {
                return NotFound();
            }

            employee.FirstName = employeeDto.FirstName;
            employee.LastName = employeeDto.LastName;
           

            // Update Qualifications
            employee.Qualifications.Clear();
            employee.Qualifications.AddRange(employeeDto.Qualifications.Select(q => new Qualification
            {
                Degree = q.Degree,
                Institution = q.Institution,
               
            }));

            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/employees/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            var employee = _context.Employees.Find(id);

            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            _context.SaveChanges();

            return NoContent();
        }
    }


}
