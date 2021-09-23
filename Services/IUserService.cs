using ticket_system.Models;

namespace ticket_system.Services
{
    public interface IUserService
    {
        User GetUser(string username);
    }
}