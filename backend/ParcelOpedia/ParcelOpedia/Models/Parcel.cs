using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ParcelOpedia.Models
{
    public class Parcel
    {
        public int Id { get; set; } // Primary key for the database
        public string From { get; set; } // Origin address
        public string To { get; set; } // Destination address
        public string SenderName { get; set; } // Sender's name
        public string SenderEmail { get; set; } // Sender's email address
        public string RecipientName { get; set; } // Recipient's name
        public string RecipientEmail { get; set; } // Recipient's email address
        public decimal Cost { get; set; } // Cost of shipping
        public decimal Weight { get; set; } // Weight of the parcel
        public string Note { get; set; } // Additional notes
        /*public string Feedback { get; set; }*/ // Feedback or comments

        // Status defaults to "Pending", but do not set it from the request payload
        public string Status { get; set; } = "Pending";

        // CreatedAt defaults to the current UTC date and time
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
