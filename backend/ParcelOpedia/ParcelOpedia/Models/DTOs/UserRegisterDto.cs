using System.ComponentModel.DataAnnotations;

namespace ParcelOpedia.Models.DTOs 
{
    public class UserRegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string FullName { get; set; }

        //[Required]
        //[DataType(DataType.Password)]
        //public string Password { get; set; }

        public int? Age { get; set; }
        public string Country { get; set; }
        public string Address { get; set; }
        public string Status { get; set; }   // Default value
        public string Role { get; set; }   // Default value
    }
}
