import crypto               from 'crypto'

export default (value) => {
    let sha1 = crypto.createHash('sha1');
    sha1.update(value);
    return sha1.digest('hex');
}