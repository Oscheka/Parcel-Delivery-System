using System;

namespace ParcelOpedia.Models.DTOs
{
    public class UserDto
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public int? Age { get; set; }
        public string Address { get; set; }
        public string Role { get; set; } // Optional: Include if you need to expose the user's role
    }
}
