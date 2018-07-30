import { getUserId, Context } from '../../utils';

export const post = {
  async createDraft(parent, { title, text }, ctx: Context, info) {
    console.log('creating draft:', title);
    return ctx.db.mutation.createPost(
      {
        data: {
          title,
          text,
          isPublished: false,
          author: {
            connect: { id: 'cjk2xr8grj01f0b02ms7fiov4' },
          },
        },
      },
      info
    );
  },

  async publish(parent, { id }, ctx: Context, info) {
    console.log('publishing post: ', id);
    const userId = 'cjk2xr8grj01f0b02ms7fiov4';
    const postExists = await ctx.db.exists.Post({
      id,
      author: { id: userId },
    });
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`);
    }

    return ctx.db.mutation.updatePost(
      {
        where: { id },
        data: { isPublished: true },
      },
      info
    );
  },

  async deletePost(parent, { id }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const postExists = await ctx.db.exists.Post({
      id,
      author: { id: userId },
    });
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`);
    }

    return ctx.db.mutation.deletePost({ where: { id } });
  },
};
