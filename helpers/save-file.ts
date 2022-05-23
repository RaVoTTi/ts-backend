import { UploadedFile, FileArray, } from 'express-fileupload'

export const saveFile = (
    files: FileArray,
    folder = '',
    validExtensions = ['jpg', 'png', 'jpeg', 'gif'],
)  => {
    return new Promise((resolve, reject) => {
        // if (!files || Object.keys(files).length === 0 || !files.image) {
        //     return reject("The image is required ")
            

        // }
        const image = files.image as UploadedFile
        const nameArray = image.name.split('.')
        const extension = nameArray[nameArray.length - 1]

        if (!validExtensions.includes(extension)) {
            return reject("The extension file's isn't accepted")
        }

        const fileName = `image-${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}.${extension}`

        const uploadPath = process.env.PWD + '/public/uploads/'+ folder + '/' + fileName
        image.mv(uploadPath, function (err: any) {
            if (err) {
                return reject(err)
            }
            resolve(fileName)
        })
    })
}
