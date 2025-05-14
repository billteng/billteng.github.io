
using System.ComponentModel.DataAnnotations;

namespace dotnet9ConsoleApp1.entities
{
    public class Patient
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string? FirstName { get; set; }

        [MaxLength(50)]
        public string? MiddleName { get; set; }

        [MaxLength(50)]
        [Required]
        public string? LastName { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }
    }
}