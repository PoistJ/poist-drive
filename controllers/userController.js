const { prisma } = require("../lib/prisma.js");

exports.foldersGet = async (req, res, next) => {
  try {
    const folders = await prisma.folders.findMany({
      where: { userId: req.user.id },
      select: { userId: true, id: true, foldername: true },
    });

    console.log(folders);

    res.render("drive-home", { folders: folders });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};
