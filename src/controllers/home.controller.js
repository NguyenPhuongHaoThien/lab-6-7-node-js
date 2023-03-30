// const isValidPayload= require('../utils/isValidPayload')
// const { apiFailure, apiSuccess } = require('../utils/api-response')

const fs = require('fs')
const multer = require('multer')
const path = require('path')
const ziplocal = require('zip-local');

const dir_name = __dirname + "../../../"
class HomeController {
    show(req, res) {
        fs.readdir(dir_name, (err, files) => {
            const data_folders = []
            const data_files = []
    
            if(err) console.log(err)
            files.forEach((file) => {
                let stat = fs.statSync(dir_name + file)
                if(stat.isFile()) {
                    data_files.push({name: file, link: dir_name + file, type: stat.isFile(), size: stat.size / 1000, last_modified: new Date(stat.ctime).toISOString().slice(0, 10)})
                } else {
                    data_folders.push({name: file, link: dir_name + file, type: stat.isFile(), size: stat.size / 1000, last_modified: new Date(stat.ctime).toISOString().slice(0, 10)})
                }
            })

            res.render('home', { name: req.session.name, data_files, data_folders })
        })
    }
    upload(req, res) {
        const uploads = multer({
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                  cb(null, dir_name + "/uploads")
                },
                filename: function (req, file, cb) {
                  cb(null, file.originalname)
                }
            }),
            fileFilter: function(req, file, callback) {
                const ext = path.extname(file.originalname) 
                if (ext == '.png' || ext == '.jpg' || ext == '.txt' || ext == '.pdf') {
                    fs.exists(dir_name+file.originalname, (exist) => {
                        if(exist) res.send("images already uploaded")
                        else callback(null, true)
                    })
                } else {
                    res.send("Files not allowed")
                }
            }
        }).single('files')
        uploads(req, res, () => {
            console.log("File is uploaded")
            res.send("File is uploaded")
        })
    }

    create(req, res) {
        // console.log(file_name, file_content)
        if(req.body.file_name != '') {
            fs.writeFile(dir_name + req.body.file_name + ".txt", req.body.file_content, (err) => {
                if(err) {
                    req.session.flash = {
                        type: 'danger', 
                        message: "Vui lòng check lại file"
                    }
                    res.redirect("/file")
                } else {
                    req.session.flash = {
                        type: 'success', 
                        message: "Create file successful"
                    }
                    res.render("file", { name: req.body.file_name, content: req.body.file_content})
                }
            })
        } else {
            req.session.flash = {
                type: 'danger', 
                message: "Vui lòng check lại file"
            }
            res.redirect("/")
        }
    }

    createFolder(req, res) {
        console.log("hfidhfids")
        fs.mkdir(dir_name + "/new_folder", (err) => {
            if(err) {
                req.session.flash = {
                    type: 'danger', 
                    message: "Trùng tên folder đã có"
                }
                res.redirect("/")
            } else {
                req.session.flash = {
                    type: 'succes', 
                    message: "Tạo folder thành công"
                }
                res.redirect("/")
            }
        })
    }
    rename(req, res) {
        const filename =req.body.file_name
        const filename_new = req.body.file_name_new


        fs.rename(filename, filename_new, (err) => {
            if(err) {
                req.session.flash = {
                    type: 'danger', 
                    message: "Rename error"
                }
                res.redirect("/")
            } else {
                req.session.flash = {
                    type: 'succes', 
                    message: "Rename file success"
                }
                res.redirect("/")
            }
        } )
    }
    delete(req, res) {
        const filename = dir_name + req.body.file_name
        console.log("filename", filename)
        fs.access(filename, (err) => {
            if (err) {
              console.error('File does not exist!');
              return;
            }
          
            let stat = fs.statSync(filename)
            if(stat.isFile()) {
                fs.unlink(filename, (err) => {
                  if (err) return err;
                });
                req.session.flash = {
                    type: 'succes', 
                    message: "Delete file success"
                }
                res.redirect("/")
            } else {
                fs.rmdir(filename, (err) => {
                    if (err) return err;
                });
                req.session.flash = {
                    type: 'succes', 
                    message: "Delete folder success"
                }
                res.redirect("/")
            }
            // Delete the file
        });
       
    }
	download(req, res) {
        const name_download = dir_name + req.body.file_name
        
        fs.access(name_download, (err) => {
            if (err) {
                console.error('File does not exist!');
                return;
            }
            
            let stat = fs.statSync(name_download)
            if(stat.isFile()) {
                 // Set the content type header to indicate that we're sending a binary file
                res.setHeader('Content-Type', 'application/octet-stream');

                // Set the filename header to indicate the name of the downloaded file
                res.setHeader('Content-Disposition', `attachment; filename=${req.body.file_name}`);

                // Create a read stream for the file
                const fileStream = fs.createReadStream(name_download);

                // Pipe the read stream to the write stream for the response
                fileStream.pipe(res);
            } else {
                const filename = name_download + ".zip"
                ziplocal.sync.zip(name_download).compress().save(filename)
                res.download(filename)
            }
            // Delete the file
        });

    }
}

module.exports = new HomeController()

