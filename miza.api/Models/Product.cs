using System.ComponentModel.DataAnnotations.Schema;
using miza.api.Models;

namespace miza.api.Data
{
    public class Product
    {
        public int Id {get; set;}

        public string Name {get; set;}

        public double Price {get; set;}

        public int Quentity {get; set;}

        public string Category {get; set;}

        [ForeignKey("UserNavigation")]
        public int UserId {get; set;}

        public virtual User UserNavigation {get; set;}
    }
}