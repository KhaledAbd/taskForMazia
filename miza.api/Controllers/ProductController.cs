using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using miza.api.Data;
using miza.api.Dtos;

namespace miza.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController: ControllerBase
    {
        private readonly IProductRepository repo;
        private readonly IMapper mapper;

        public ProductController(IProductRepository repo, IMapper mapper){
            this.repo = repo;
            this.mapper = mapper;
        }
        [HttpGet("{id}", Name = "GetProduct")]                      ///Get Product By Id
        public async Task<ActionResult<ProductReturnDto>> GetProduct(int id){
            Product product = await repo.GetProduct(id);
            return product == null?  NotFound() : Ok( mapper.Map<ProductReturnDto>(product));
        }
        [HttpGet]                                           //// Get All Product in List 
        public async Task<IEnumerable<ProductReturnDto>> GetProducts() =>  mapper.Map<IEnumerable<ProductReturnDto>>(await repo.GetProducts());

        [HttpPost]          //// Post Product
        public async Task<ActionResult<Product>> AddProduct(Product product) {
            if(product != null && int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) == product.UserId){
                await repo.Add(product);
                return await repo.SaveAll() ?  CreatedAtAction("GetProduct" , new {product.Id, product}) : NotFound(new {error = "Duplicate Product"});
            }
            return NotFound(new {error = "The Product is Empty"});
        }
        [HttpDelete("{productId}")]   //// Delete Product
        public async Task<ActionResult> RemoveProduct(int productId){
            try{
                Product product = await repo.GetProduct(productId);
                if(product != null){
                    repo.Delete(product);
                    await repo.SaveAll();
                }
            }catch(Exception e){
                await Console.Error.WriteAsync(e.Message);
            }
            return Ok();
        }

    }
}