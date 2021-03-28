
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.photos
{
    public class Add
    {
        public class Command : IRequest<Result<Photo>>
        {
            public IFormFile File { get; set; }

        }
        public class Handler : IRequestHandler<Command, Result<Photo>>
        {
            private readonly DataContext context;
            private readonly IPhotoAccessor photoAccessor;
            private readonly IUserAccessor userAccessor;
            public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                this.userAccessor = userAccessor;
                this.photoAccessor = photoAccessor;
                this.context = context;
            }

            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await this.context.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == this.userAccessor.GetUsername());

                if(user == null) return null;

                var photoUploadResult = await this.photoAccessor.AddPhoto(request.File);

                var photo = new Photo 
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };

                if (!user.Photos.Any(x => x.IsMain)) photo.IsMain = true;

                user.Photos.Add(photo);
                
                var result = await this.context.SaveChangesAsync() > 0;

                if(result) return Result<Photo>.Success(photo);

                return Result<Photo>.Failure("Problem adding photo");
            }
        }
    }
}