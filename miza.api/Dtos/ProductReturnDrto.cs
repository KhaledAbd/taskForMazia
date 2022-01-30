using miza.api.Models;

namespace miza.api.Dtos
{
    public class ProductReturnDto
    {
        public int Id {get; set;}
        public string Name {get; set;}

        public double Price {get; set;}

        public int Quentity {get; set;}

        public string Category {get; set;}
        public UserForDetailedDto user {get; set;} 
        
   }
}