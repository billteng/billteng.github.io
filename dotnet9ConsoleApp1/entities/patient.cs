// patien entity class
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace dotnet9ConsoleApp1.entities
{
    public class Patient
    {
        [Key]
        public int Id { get; set; }  // Primary key

        [Required]
        [MaxLength(50)]
        public required string FirstName { get; set; }

        [MaxLength(50)]
        public string? MiddleName { get; set; }

        [MaxLength(50)]
        public required string LastName { get; set; }

        [Required]
        public required DateTime BirthDate { get; set; }
    }
}