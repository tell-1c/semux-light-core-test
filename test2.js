const { Key } = require('semux-js');

var account = Key.generateKeyPair();
var address = account.toAddressHexString();
var count = 0;

process.stdout.write(`\rSTART!`);

while (true) {
    count++;
    account = Key.generateKeyPair();
    address = account.toAddressHexString();
    if (address.indexOf('dead') == 0 ||
        (address.indexOf('00') == 0 && address.indexOf('00',38) == 38) ||
        address.indexOf('888888') !== -1 ||
        address.indexOf('face', 36) == 36) {
            process.stdout.write(`\rFINISH! Attempts=${count} Prvkey=` + toHexString(account.getEncodedPrivateKey()) + ` Addr=0x${address}`);
            break;
        }

    if ((count % 100) == 0) {
        process.stdout.write(`\rPROGRESS: Attempts=${count}`);
    }
}

function toHexString(byteArray) {
    return Array.from(byteArray, function (byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2)
    }).join('');
}