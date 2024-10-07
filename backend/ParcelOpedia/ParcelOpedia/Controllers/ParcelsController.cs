using ActiveUp.Net.Mail;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ParcelOpedia.Data;
using ParcelOpedia.Models;
using ParcelOpedia.Models.DTOs;
using ParcelOpedia.Service;
using ParcelOpedia.Utility;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ParcelOpedia.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ParcelsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ApiResponse _response;
        private readonly IEmailSender _emailSender;

        public ParcelsController(ApplicationDbContext context, IEmailSender emailSender)
        {
            _context = context;
            _response = new ApiResponse();
            _emailSender = emailSender; // Initialize your email sender service
        }




        
        [HttpPost("addparcel")]
        public async Task<IActionResult> AddParcel([FromBody] ParcelDto model)
        {
            if (model == null || !ModelState.IsValid)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Invalid model state");
                return BadRequest(_response);
            }

            // Create a new parcel with default values
            var newParcel = new Parcel
            {
                From = model.From,
                To = model.To,
                SenderName = model.SenderName,
                SenderEmail = model.SenderEmail,
                RecipientName = model.RecipientName,
                RecipientEmail = model.RecipientEmail,
                Cost = model.Cost,
                Weight = model.Weight,
                Note = model.Note,
                //Feedback = model.Feedback,
                // Status is set to default value "Pending" by the model
                // CreatedAt is also set to current UTC date and time by the model
            };

            try
            {
                // Add the parcel to the database
                _context.Parcels.Add(newParcel);
                await _context.SaveChangesAsync();

                // Read the email templates
                var senderTemplatePath = Path.Combine(Directory.GetCurrentDirectory(), "EmailTemplate", "SenderPendingParcel.html");
                var recipientTemplatePath = Path.Combine(Directory.GetCurrentDirectory(), "EmailTemplate", "RecipientPendingParcel.html");
                var senderTemplate = await System.IO.File.ReadAllTextAsync(senderTemplatePath);
                var recipientTemplate = await System.IO.File.ReadAllTextAsync(recipientTemplatePath);

                // Replace placeholders for sender
                var senderSubject = "Your Parcel is being processed";
                var senderMessage = senderTemplate
                    .Replace("{SenderName}", model.SenderName)
                    .Replace("{From}", model.From)
                    .Replace("{To}", model.To)
                    .Replace("{RecipientName}", model.RecipientName)
                    .Replace("{Cost}", model.Cost.ToString("F2"))
                    .Replace("{Weight}", model.Weight.ToString())
                    .Replace("{Note}", model.Note);

                // Replace placeholders for recipient
                var recipientSubject = "You've Got a Parcel";
                var recipientMessage = recipientTemplate
                    .Replace("{SenderName}", model.SenderName)
                    .Replace("{From}", model.From)
                    .Replace("{To}", model.To)
                    .Replace("{RecipientName}", model.RecipientName)
                    .Replace("{Cost}", model.Cost.ToString("F2"))
                    .Replace("{Weight}", model.Weight.ToString())
                    .Replace("{Note}", model.Note);

                // Send email to the sender
                await _emailSender.SendEmailAsync(model.SenderEmail, senderSubject, senderMessage);

                // Send email to the recipient
                await _emailSender.SendEmailAsync(model.RecipientEmail, recipientSubject, recipientMessage);

                _response.StatusCode = HttpStatusCode.Created;
                _response.IsSuccess = true;
                _response.Result = newParcel;
                return CreatedAtAction(nameof(GetParcel), new { id = newParcel.Id }, _response);
            }
            catch (Exception ex)
            {
                _response.StatusCode = HttpStatusCode.InternalServerError;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Error while adding parcel: " + ex.Message);
                return StatusCode((int)HttpStatusCode.InternalServerError, _response);
            }
        }


        
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetParcels()
        {
            var parcels = await _context.Parcels.OrderByDescending(p => p.CreatedAt).ToListAsync();
            if (!parcels.Any())
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("No parcels found");
                return NotFound(_response);
            }

            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            _response.Result = parcels;
            _response.PageSize = parcels.Count;
            return Ok(_response);
        }

       
        // GET: api/parcels/find/{id}
        [HttpGet("GetById")]
        public async Task<IActionResult> GetParcel(int id)
        {
            var parcel = await _context.Parcels.FindAsync(id);
            if (parcel == null)
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Parcel not found");
                return NotFound(_response);
            }

            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            _response.Result = parcel;
            return Ok(_response);
        }

        // GET: api/parcels/me
        //[HttpPost("me")]
        //public async Task<IActionResult> GetUserParcels([FromBody] UserParcelRequest request)
        //{
        //    var parcels = await _context.Parcels
        //        .Where(p => p.SenderEmail == request.Email)
        //        .OrderByDescending(p => p.CreatedAt)
        //        .ToListAsync();

        //    if (!parcels.Any())
        //    {
        //        _response.StatusCode = HttpStatusCode.NotFound;
        //        _response.IsSuccess = false;
        //        _response.ErrorMessages.Add("No parcels found for this user");
        //        return NotFound(_response);
        //    }

        //    _response.StatusCode = HttpStatusCode.OK;
        //    _response.IsSuccess = true;
        //    _response.Result = parcels;
        //    return Ok(_response);
        //}

        // PUT: api/parcels/{id}
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutParcel(int id, [FromBody] Parcel parcel)
        //{
        //    if (id != parcel.Id || parcel == null || !ModelState.IsValid)
        //    {
        //        _response.StatusCode = HttpStatusCode.BadRequest;
        //        _response.IsSuccess = false;
        //        _response.ErrorMessages.Add("Invalid model state or ID mismatch");
        //        return BadRequest(_response);
        //    }

        //    // Check if the parcel exists
        //    var existingParcel = await _context.Parcels.FindAsync(id);
        //    if (existingParcel == null)
        //    {
        //        _response.StatusCode = HttpStatusCode.NotFound;
        //        _response.IsSuccess = false;
        //        _response.ErrorMessages.Add("Parcel not found");
        //        return NotFound(_response);
        //    }

        //    // Attach the parcel entity to the context and update it
        //    _context.Entry(existingParcel).CurrentValues.SetValues(parcel);

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        _response.StatusCode = HttpStatusCode.InternalServerError;
        //        _response.IsSuccess = false;
        //        _response.ErrorMessages.Add("Error occurred while updating the parcel");
        //        return StatusCode((int)HttpStatusCode.InternalServerError, _response);
        //    }

        //    _response.StatusCode = HttpStatusCode.OK;
        //    _response.IsSuccess = true;
        //    return Ok(_response);
        //}



        // DELETE: api/parcels/{id}
        
        [HttpPost("me")]
        public async Task<IActionResult> GetUserParcels([FromBody] UserParcelRequest request)
        {
            // Get the user's role from the JWT token
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            List<Parcel> parcels;

            try
            {
                if (userRole == SD.Role_Admin)
                {
                    // Fetch all parcels for admin
                    parcels = await _context.Parcels.OrderByDescending(p => p.CreatedAt).ToListAsync();
                }
                else
                {
                    // Fetch only parcels sent by the user
                    parcels = await _context.Parcels
                        .Where(p => p.SenderEmail == request.Email)
                        .OrderByDescending(p => p.CreatedAt)
                        .ToListAsync();
                }

                if (!parcels.Any())
                {
                    _response.StatusCode = HttpStatusCode.NotFound;
                    _response.IsSuccess = false;
                    _response.ErrorMessages.Add("No parcels found for this user");
                    return NotFound(_response);
                }

                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = parcels;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.StatusCode = HttpStatusCode.InternalServerError;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Error while retrieving parcels: " + ex.Message);
                return StatusCode((int)HttpStatusCode.InternalServerError, _response);
            }
        }

        [HttpPost("sent")]
        public async Task<IActionResult> GetSentParcels()
        {
            // Get the user's email from the JWT token
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

            if (string.IsNullOrEmpty(userEmail))
            {
                return BadRequest(new { message = "User email is required." });
            }

            var parcels = await _context.Parcels
                .Where(p => p.SenderEmail == userEmail)
                .ToListAsync();

            return Ok(new
            {
                statusCode = 200,
                isSuccess = true,
                userEmail, // Include the user's email in the response
                result = parcels,
                errorMessages = new List<string>()
            });
        }


        
        [HttpPut("updateParcel")]
        public async Task<IActionResult> PutParcel(int id, [FromBody] Parcel parcel)
        {
            if (id != parcel.Id || parcel == null || !ModelState.IsValid)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Invalid model state or ID mismatch");
                return BadRequest(_response);
            }

            // Check if the parcel exists
            var existingParcel = await _context.Parcels.FindAsync(id);
            if (existingParcel == null)
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Parcel not found");
                return NotFound(_response);
            }

            // Check if status has changed to Delivered
            var statusChangedToDelivered = existingParcel.Status != "Delivered" && parcel.Status == "Delivered";

            // Update the parcel entity
            _context.Entry(existingParcel).CurrentValues.SetValues(parcel);

            try
            {
                await _context.SaveChangesAsync();

                if (statusChangedToDelivered)
                {
                    // Read the delivered parcel email template
                    var deliveredTemplatePath = Path.Combine(Directory.GetCurrentDirectory(), "EmailTemplate", "DeliveredParcel.html");
                    var deliveredTemplate = await System.IO.File.ReadAllTextAsync(deliveredTemplatePath);

                    // Replace placeholders for delivered parcel
                    var deliveredSubject = "Your Parcel Has Been Delivered";
                    var deliveredMessage = deliveredTemplate
                        .Replace("{SenderName}", existingParcel.SenderName)
                        .Replace("{From}", existingParcel.From)
                        .Replace("{To}", existingParcel.To)
                        .Replace("{RecipientName}", existingParcel.RecipientName)
                        .Replace("{Cost}", existingParcel.Cost.ToString("F2"))
                        .Replace("{Weight}", existingParcel.Weight.ToString())
                        .Replace("{Note}", existingParcel.Note);

                    // Send email to the sender
                    await _emailSender.SendEmailAsync(existingParcel.SenderEmail, deliveredSubject, deliveredMessage);
                }

                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                return Ok(_response);
            }
            catch (DbUpdateConcurrencyException)
            {
                _response.StatusCode = HttpStatusCode.InternalServerError;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Error occurred while updating the parcel");
                return StatusCode((int)HttpStatusCode.InternalServerError, _response);
            }
        }

       
        [HttpDelete("deleteParcel")]
        public async Task<IActionResult> DeleteParcel(int id)
        {
            var parcel = await _context.Parcels.FindAsync(id);
            if (parcel == null)
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Parcel not found");
                return NotFound(_response);
            }

            _context.Parcels.Remove(parcel);
            await _context.SaveChangesAsync();

            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            return Ok(_response);
        }

      
        [HttpGet("TotalPendingParcels")]
        public async Task<IActionResult> GetTotalPendingParcels()
        {
            try
            {
                var pendingCount = await _context.Parcels.CountAsync(p => p.Status == "Pending");
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = new { TotalPendingParcels = pendingCount };
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.StatusCode = HttpStatusCode.InternalServerError;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Error while retrieving pending parcel count: " + ex.Message);
                return StatusCode((int)HttpStatusCode.InternalServerError, _response);
            }
        }

        
        [HttpGet("TotalDeliveredParcels")]
        public async Task<IActionResult> GetTotalDeliveredParcels()
        {
            try
            {
                var deliveredCount = await _context.Parcels.CountAsync(p => p.Status == "Delivered");
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = new { TotalDeliveredParcels = deliveredCount };
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.StatusCode = HttpStatusCode.InternalServerError;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Error while retrieving delivered parcel count: " + ex.Message);
                return StatusCode((int)HttpStatusCode.InternalServerError, _response);
            }
        }

    }
}
