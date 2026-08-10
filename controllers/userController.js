const { prisma } = require("../lib/prisma.js");

exports.foldersGet = async (req, res, next) => {
  try {
    const folders = await prisma.folders.findMany({
      where: { userId: req.user.id },
      select: { userId: true, id: true, foldername: true },
    });

    res.render("drive-home", { folders: folders });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

exports.uploadGet = (req, res) => {
  res.render("upload", { folderId: Number(req.params.folderId) });
};

exports.uploadPost = async (req, res, next) => {
  try {
    const fileData = await prisma.files.create({
      data: {
        userId: Number(req.params.userId),
        folder: req.params.folder,
        filename: req.file.originalname,
        filesize: req.file.size,
        filetype: req.file.mimetype,
        folderId: Number(req.params.folderId),
      },
    });

    res.redirect("/");
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

exports.filesGet = async (req, res, next) => {
  try {
    const files = await prisma.files.findMany({
      where: { folderId: Number(req.params.folderId) },
      select: {
        id: true,
        filename: true,
      },
    });

    const foldername = await prisma.folders.findFirst({
      where: { id: Number(req.params.folderId) },
      select: {
        foldername: true,
      },
    });

    res.render("folder", {
      files: files,
      folderId: req.params.folderId,
      foldername: foldername.foldername,
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};
