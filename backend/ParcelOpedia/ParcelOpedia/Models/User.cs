using Microsoft.AspNetCore.Identity;
using System.Data;

namespace ParcelOpedia.Models
{
    public class User : IdentityUser 
    {
        public string FullName { get; set; }
        public int? Age { get; set; }
        public string Country { get; set; }
        public string Address { get; set; }
        public string Status { get; set; } // Default value
        public string Role { get; set; } = "user";  // Default value
    }
}

