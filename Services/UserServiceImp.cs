using System.Linq;
using ticket_system.Data;
using ticket_system.Models;
using ticket_system.Helpers;
using Microsoft.Extensions.Options;

namespace ticket_system.Services
{
    public class UserServiceImp : IUserService
    {
        private readonly UserContext _userContext;
        
        public UserServiceImp(UserContext userContext, IJwtUtils jwtUtils, IOptions<AppSettings> appSettings)
        {
            _userContext = userContext;
        }
        
        public User GetUser(string username)
        {
            return _userContext.Users.FirstOrDefault(u => u.Username == username);
        }
    }
}