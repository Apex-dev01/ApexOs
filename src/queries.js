import { HttpError } from 'wasp/server'

export const getFiles = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.File.findMany({
    where: {
      userId: context.user.id
    }
  });
}

export const getSettings = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }
  const settings = await context.entities.Settings.findUnique({
    where: { userId: context.user.id }
  });
  if (!settings) throw new HttpError(404, 'Settings not found for the user.');
  return settings;
}

export const getBookmarks = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.Bookmark.findMany({
    where: { userId: context.user.id }
  })
}
