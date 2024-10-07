using System.ComponentModel.DataAnnotations;

namespace ParcelOpedia.Models.DTOs
{
    public class UserUpdateDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string FullName { get; set; }

        // Optional fields
        public string Address { get; set; }
        public int? Age { get; set; }
        public string Country { get; set; }
        public string Role { get; set; } // If you want to update the user's role
    }
}
