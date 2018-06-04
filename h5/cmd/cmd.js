
import app          from './app.cmd'
import ip           from './ip.cmd'
import release      from './release.cmd'
import tree         from './tree.cmd'

const parameters = process.argv.splice(2);

const arr = [
    app,
    ip,
    release,
    tree,
];

(function fireFun(index) {
    arr[index] && arr[index](parameters).then(() => {
        return fireFun(++index);
    })
})(0);
