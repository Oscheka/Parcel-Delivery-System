namespace ParcelOpedia.Models.DTOs
{
    public class ParcelDto
    {
        public string From { get; set; }
        public string To { get; set; }
        public string SenderName { get; set; }
        public string SenderEmail { get; set; }
        public string RecipientName { get; set; }
        public string RecipientEmail { get; set; }
        public decimal Cost { get; set; }
        public decimal Weight { get; set; }
        public string Note { get; set; }
        //public string Feedback { get; set; }
    }

}
