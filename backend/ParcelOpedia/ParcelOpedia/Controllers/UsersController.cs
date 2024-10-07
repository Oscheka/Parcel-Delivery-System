using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ParcelOpedia.Models;
using ParcelOpedia.Models.DTOs;
using ParcelOpedia.Service;
using ParcelOpedia.Utility;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ParcelOpedia.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private const string Characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        private static readonly Random Random = new Random();

        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly ApiResponse _response;
        private readonly IEmailSender _emailSender;

        public UsersController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IEmailSender emailSender, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _response = new ApiResponse();
            _emailSender = emailSender;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto model)
        {
            if (model == null || !ModelState.IsValid)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Invalid model state");
                return BadRequest(_response);
            }

            // Check if the user already exists
            var userExists = await _userManager.FindByEmailAsync(model.Email);
            if (userExists != null)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Email already exists");
                return BadRequest(_response);
            }

            // Generate a random password
            var password = GenerateRandomPassword();

            // Create a new user
            var newUser = new User
            {
                UserName = model.Email,
                Email = model.Email,
                NormalizedEmail = model.Email.ToUpper(),
                FullName = model.FullName,
                Age = model.Age,
                Country = model.Country,
                Address = model.Address,
                Status = model.Status,
                Role = model.Role
            };

            try
            {
                // Create the user
                var result = await _userManager.CreateAsync(newUser, password);
                if (result.Succeeded)
                {
                    // Assign role to the user
                    if (!await _roleManager.RoleExistsAsync(SD.Role_Admin))
                    {
                        await _roleManager.CreateAsync(new IdentityRole(SD.Role_Admin));
                        await _roleManager.CreateAsync(new IdentityRole(SD.Role_User));
                    }

                    var role = model.Role.ToLower() == SD.Role_Admin ? SD.Role_Admin : SD.Role_User;
                    await _userManager.AddToRoleAsync(newUser, role);

                    // Read the email template
                    var templatePath = Path.Combine(Directory.GetCurrentDirectory(), "EmailTemplate", "WelcomeEmail.html");
                    var template = await System.IO.File.ReadAllTextAsync(templatePath);

                    // Replace placeholders in the email template
                    var subject = "Welcome to the Parcel Delivery Portal";
                    var message = template
                        .Replace("{FullName}", model.FullName)
                        .Replace("{Email}", model.Email)
                        .Replace("{Password}", password)  // Include generated password
                        .Replace("{Role}", role);

                    await _emailSender.SendEmailAsync(newUser.Email, subject, message);

                    _response.StatusCode = HttpStatusCode.Created;
                    _response.IsSuccess = true;
                    _response.Result = newUser;
                    return CreatedAtAction(nameof(GetUserById), new { id = newUser.Id }, _response);
                }
                else
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.IsSuccess = false;
                    _response.ErrorMessages.AddRange(result.Errors.Select(e => e.Description));
                    return BadRequest(_response);
                }
            }
            catch (Exception ex)
            {
                _response.StatusCode = HttpStatusCode.InternalServerError;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Error while registering: " + ex.Message);
                return StatusCode((int)HttpStatusCode.InternalServerError, _response);
            }
        }

        private string GenerateRandomPassword(int length = 10)
        {
            if (length <= 0)
            {
                throw new ArgumentException("Password length must be greater than zero.", nameof(length));
            }

            if (Characters.Length == 0)
            {
                throw new InvalidOperationException("Character set is empty.");
            }

            return new string(Enumerable.Repeat(Characters, length)
                .Select(s => s[Random.Next(s.Length)]).ToArray());
        }



        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto model)
        {
            if (model == null || string.IsNullOrWhiteSpace(model.Email) || string.IsNullOrWhiteSpace(model.Password))
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Invalid login request");
                return BadRequest(_response);
            }

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
            {
                _response.StatusCode = HttpStatusCode.Unauthorized;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Invalid email or password");
                return Unauthorized(_response);
            }

            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault() ?? SD.Role_User;

            var tokenHandler = new JwtSecurityTokenHandler();

            var secret = _configuration["Jwt:Secret"]; // Changed this line
            if (string.IsNullOrWhiteSpace(secret))
            {
                _response.StatusCode = HttpStatusCode.InternalServerError;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("JWT secret key is not configured.");
                return StatusCode((int)HttpStatusCode.InternalServerError, _response);
            }

            var key = Encoding.ASCII.GetBytes(secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role)
        }),
                Expires = DateTime.UtcNow.AddDays(10),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            _response.Result = new
            {
                user.Email,
                Token = tokenString,
                Role = role
            };

            return Ok(_response);
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // In a typical JWT scenario, you can't invalidate the token, 
            // but you can instruct the client to delete it.

            // You can also implement token blacklisting here if you choose to.

            // Return a response indicating the logout was successful.
            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            _response.Result = "Logged out successfully.";

            return Ok(_response);
        }



        [HttpGet("GetUsersList")]
        public async Task<IActionResult> GetUsersList()
        {
            var users = await _userManager.Users.ToListAsync();
            if (users == null || !users.Any())
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("No users found");
                return NotFound(_response);
            }

            var userDtos = users.Select(user => new UserDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                Age = user.Age,
                Address = user.Address,
                Role = user.Role
            }).ToList();

            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            _response.Result = userDtos;
            _response.PageSize = userDtos.Count;
            return Ok(_response);
        }

        [HttpGet("GetUserCount")]
        public async Task<IActionResult> GetUserCount()
        {
            try
            {
                var userCount = await _userManager.Users.CountAsync();
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;
                _response.Result = new { TotalUsers = userCount };
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.StatusCode = HttpStatusCode.InternalServerError;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Error while retrieving user count: " + ex.Message);
                return StatusCode((int)HttpStatusCode.InternalServerError, _response);
            }
        }

        [HttpGet("GetUserById")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("User not found");
                return NotFound(_response);
            }

            var roles = await _userManager.GetRolesAsync(user);
            var userDto = new UserDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                Role = roles.FirstOrDefault() ?? SD.Role_User
            };

            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            _response.Result = userDto;
            return Ok(_response);
        }

        [HttpPut("updateUser")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] UserUpdateDto model)
        {
            if (!ModelState.IsValid)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("Invalid model state");
                return BadRequest(_response);
            }

            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("User not found");
                return NotFound(_response);
            }

            user.Email = model.Email;
            user.UserName = model.Email;
            user.FullName = model.FullName;

            var updateResult = await _userManager.UpdateAsync(user);
            if (!updateResult.Succeeded)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.AddRange(updateResult.Errors.Select(e => e.Description));
                return BadRequest(_response);
            }

            if (model.Role != null)
            {
                var currentRoles = await _userManager.GetRolesAsync(user);
                if (!string.Equals(currentRoles.FirstOrDefault(), model.Role, StringComparison.OrdinalIgnoreCase))
                {
                    var removeRolesResult = await _userManager.RemoveFromRolesAsync(user, currentRoles);
                    if (!removeRolesResult.Succeeded)
                    {
                        _response.StatusCode = HttpStatusCode.BadRequest;
                        _response.IsSuccess = false;
                        _response.ErrorMessages.AddRange(removeRolesResult.Errors.Select(e => e.Description));
                        return BadRequest(_response);
                    }

                    var newRole = model.Role.ToLower() == SD.Role_Admin ? SD.Role_Admin : SD.Role_User;
                    var addRoleResult = await _userManager.AddToRoleAsync(user, newRole);
                    if (!addRoleResult.Succeeded)
                    {
                        _response.StatusCode = HttpStatusCode.BadRequest;
                        _response.IsSuccess = false;
                        _response.ErrorMessages.AddRange(addRoleResult.Errors.Select(e => e.Description));
                        return BadRequest(_response);
                    }
                }
            }

            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            return Ok(_response);
        }

        [HttpDelete("deleteUser")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                _response.StatusCode = HttpStatusCode.NotFound;
                _response.IsSuccess = false;
                _response.ErrorMessages.Add("User not found");
                return NotFound(_response);
            }

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessages.AddRange(result.Errors.Select(e => e.Description));
                return BadRequest(_response);
            }

            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            return Ok(_response);
        }
    }
}

