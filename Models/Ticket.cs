namespace ticket_system.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public string Summary { get; set; }
        public string Description { get; set; }
        public string Creator { get; set; }
        public bool IsResolved { get; set; }
    }
}