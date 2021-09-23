using ticket_system.Models;

namespace ticket_system.Services
{
    public interface IUserService
    {
        User GetUserByUsername(string username);
        User GetUserById(int id);
    }
}