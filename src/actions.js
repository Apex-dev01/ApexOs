import { HttpError } from 'wasp/server'

export const createFile = async ({ name, content }, context) => {
  if (!context.user) { throw new HttpError(401) };
  return context.entities.File.create({
    data: {
      name,
      content,
      userId: context.user.id
    }
  });
}

export const updateSettings = async ({ theme }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const settings = await context.entities.Settings.findUnique({
    where: { userId: context.user.id }
  });

  if (!settings) { throw new HttpError(404, 'Settings not found') };

  return context.entities.Settings.update({
    where: { userId: context.user.id },
    data: { theme }
  });
}

export const addBookmark = async ({ url, title }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const newBookmark = await context.entities.Bookmark.create({
    data: {
      url,
      title,
      userId: context.user.id
    }
  });

  return newBookmark;
}
