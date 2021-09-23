using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ticket_system.Dtos;
using ticket_system.Services;
using ticket_system.Helpers;
using Microsoft.Extensions.Options;

namespace ticket_system.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private IJwtUtils _jwtUtils;
        private readonly AppSettings _appSettings;

        public AuthController(IUserService userService, IJwtUtils jwtUtils, IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _jwtUtils = jwtUtils;
            _appSettings = appSettings.Value;
        }

        [HttpPost("login")]
        public IActionResult Login(AuthenticateRequest request)
        {
            var user = _userService.GetUser(request.Username);
            
            if (user == null) return BadRequest(new {message = "User is not found"});

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                return BadRequest(new {message = "Invalid Password"});
            }
            
            var jwtToken = _jwtUtils.GenerateJwtToken(user);
            return Ok(new AuthenticateResponse(user, jwtToken));
        }
        
        [HttpGet("get")]
        public IActionResult Get()
        {
            return Ok("Auth Get works");
        }
    }
}