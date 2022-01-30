using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace miza.api.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;
        public ProductRepository(DataContext _context)
        {
            this._context = _context;
        }

        public async Task<Product> GetProduct(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<bool> SaveAll()
        {
            return (await _context.SaveChangesAsync()) > 0 ? true: false;
        }

        public async Task Add(Product product)
        {   if((await _context.Products.FindAsync(product.Id) ) == null ) 
                await _context.Products.AddAsync(product);
        }
        public void Delete(Product entity)
        {
            _context.Products.Remove(entity);
        }

        public async Task<Product> GetLastProduct()
        {
            return await _context.Products.LastAsync();
        }

    }
}