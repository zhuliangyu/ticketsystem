using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ticket_system.Dtos;
using ticket_system.Services;

namespace ticket_system.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _userService.GetUser(dto.Username);
            
            if (user == null) return BadRequest(new {message = "User is not found"});

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest(new {message = "Invalid Password"});
            }

            return Ok(user);
        }
        
        [HttpGet("get")]
        public IActionResult Get()
        {
            return Ok("Auth Get works");
        }
    }
}