using System.ComponentModel.DataAnnotations;

namespace ParcelOpedia.Models
{
    public class UserParcelRequest
    {
        [Required] // This makes the Email field required
        public string Email { get; set; }
    }
}
