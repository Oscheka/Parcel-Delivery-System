//using ParcelOpedia.Data;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.IdentityModel.Tokens;
//using Microsoft.OpenApi.Models;
//using ParcelOpedia.Models;
//using System.Text;
//using ParcelOpedia.Service;

//var builder = WebApplication.CreateBuilder(args);

//builder.Services.AddDbContext<ApplicationDbContext>(option =>
//{
//    option.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
//});

//// Add services to the container.
//builder.Services.AddControllers();

//// Configure CORS policies
//builder.Services.AddCors(options =>
//    options.AddPolicy("AllowAll", p => p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

//// Configure Swagger/OpenAPI
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
//builder.Services.Configure<SmtpSettings>(builder.Configuration.GetSection("SmtpSettings"));
//builder.Services.AddTransient<IEmailSender, EmailSender>();

//builder.Services.AddIdentity<User, IdentityRole>()
//    .AddEntityFrameworkStores<ApplicationDbContext>();

//builder.Services.Configure<IdentityOptions>(options =>
//{
//    options.Password.RequireDigit = false;
//    options.Password.RequiredLength = 1;
//    options.Password.RequireLowercase = false;
//    options.Password.RequireUppercase = false;
//    options.Password.RequireNonAlphanumeric = false;
//});

//// Configure Authentication
//var key = builder.Configuration.GetValue<string>("Jwt:Secret");

//if (string.IsNullOrWhiteSpace(key))
//{
//    throw new ArgumentException("JWT secret key is not configured.");
//}

//builder.Services.AddAuthentication(u =>
//{
//    u.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    u.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//}).AddJwtBearer(u =>
//{
//    u.RequireHttpsMetadata = false;
//    u.SaveToken = true;
//    u.TokenValidationParameters = new TokenValidationParameters
//    {
//        ValidateIssuerSigningKey = true,
//        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)),
//        ValidateIssuer = false,
//        ValidateAudience = false
//    };
//});

//builder.Services.AddSwaggerGen(options =>
//{
//    options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme
//    {
//        Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n " +
//                      "Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\n" +
//                      "Example: \"Bearer 12345abcdef\"",
//        Name = "Authorization",
//        In = ParameterLocation.Header,
//        Scheme = JwtBearerDefaults.AuthenticationScheme
//    });
//    options.AddSecurityRequirement(new OpenApiSecurityRequirement
//    {
//        {
//            new OpenApiSecurityScheme
//            {
//                Reference = new OpenApiReference
//                {
//                    Type = ReferenceType.SecurityScheme,
//                    Id = "Bearer"
//                },
//                Scheme = "oauth2",
//                Name = "Bearer",
//                In = ParameterLocation.Header
//            },
//            new List<string>()
//        }
//    });
//});

//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseHttpsRedirection();
//app.UseAuthentication();
//app.UseAuthorization();

//// Use CORS policy globally
//app.UseCors("AllowAll");
//app.MapControllers();

//app.Run();

using ParcelOpedia.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using ParcelOpedia.Models;
using System.Text;
using ParcelOpedia.Service;

var builder = WebApplication.CreateBuilder(args);

// Configure the database context
builder.Services.AddDbContext<ApplicationDbContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Add services to the container.
builder.Services.AddControllers();

// Configure CORS policies
builder.Services.AddCors(options =>
    options.AddPolicy("AllowAll", p => p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

// Configure Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<SmtpSettings>(builder.Configuration.GetSection("SmtpSettings"));
builder.Services.AddTransient<IEmailSender, EmailSender>();

// Configure Identity
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 1;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
});

// Configure Authentication
var key = builder.Configuration.GetValue<string>("Jwt:Secret");

if (string.IsNullOrWhiteSpace(key))
{
    throw new ArgumentException("JWT secret key is not configured.");
}

builder.Services.AddAuthentication(u =>
{
    u.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    u.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(u =>
{
    u.RequireHttpsMetadata = false;
    u.SaveToken = true;
    u.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

// Configure Swagger with JWT authentication
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n " +
                      "Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\n" +
                      "Example: \"Bearer 12345abcdef\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Scheme = JwtBearerDefaults.AuthenticationScheme
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use CORS policy globally
app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
