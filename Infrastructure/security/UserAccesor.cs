using System.Security.Claims;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.security
{
    public class UserAccesor : IUserAccessor
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public UserAccesor(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        public string GetUsername()
        {
            return this.httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
        }
    }
}