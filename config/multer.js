const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public`)
  },
  filename: (req, file, cb) => {
    const fileType = file.mimetype.split('/')[1]

    const originalName = file.originalname.split('.')[0]

    const fileName = `${originalName}-${Date.now()}.${fileType}`

    cb(null, fileName)
  }
})

const upload = multer({ storage: storage })

module.exports = {
  storage,
  upload
}