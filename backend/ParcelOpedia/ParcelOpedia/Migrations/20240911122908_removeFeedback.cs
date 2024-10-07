using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ParcelOpedia.Migrations
{
    /// <inheritdoc />
    public partial class removeFeedback : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "Parcels");

            migrationBuilder.DropColumn(
                name: "Feedback",
                table: "Parcels");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "Parcels",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Feedback",
                table: "Parcels",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
