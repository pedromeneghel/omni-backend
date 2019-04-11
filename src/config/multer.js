const multer = require( 'multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp'),
    storage: multer.diskStorage({
        destiantion: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp'));
            //Verificar porque não está salvando na pasta tmp
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, file.key);
            });
        }
    })
}