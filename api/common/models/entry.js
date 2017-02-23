'use strict';

module.exports = function(Entry) {
  Entry.observe('before save', (ctx, next) => {
    if (ctx.isNewInstance) {
      ctx.instance.sender = ctx.instance.sender.toLowerCase();
      ctx.instance.receiver = ctx.instance.receiver.toLowerCase();

      let data = ctx.instance;


      let slug = data.receiver;
      checkSlugAvailabilty(slug)
      .then(slug => {
        ctx.instance.slug = slug;
        next();
      })
      .catch(err => next(err));
    } else {
      next();
    }
  });

  let checkSlugAvailabilty = (slug, number) => {
    let searchSlug = slug + (number ? ('-' + number) : '');

    return new Promise((resolve, reject) => {
      return Entry.findOne({
        where: {
          slug: searchSlug
        }
      })
      .then(result => {
        if(!result) {
          return resolve(searchSlug);
        }
        else {
          let random = Math.floor(Math.random() * (9999 - 1000) + 1000);
          checkSlugAvailabilty(slug, random)
          .then(result => {
            return resolve(result);
          });
        }
      });
    })
  };
};
