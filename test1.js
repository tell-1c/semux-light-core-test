const Module = require('./libs/UnoSemuxLightCoreWasm.js')
var count = 0;
var phrase = '';
var priv = ''; 
var address = '0x';
var mnemo, hdGroup_id, addr;

async function generateHD() {

  const unoInstance = await Module()
  const wallet = unoInstance.UnoSemuxWallet.new_wallet()


  process.stdout.write(`\rSTART!`);

  while (true) {
    count++;
    mnemo = unoInstance.UnoSemuxWallet.new_mnemonic_phrase();
    phrase = mnemo.data;
    hdGroup_id = wallet.data.add_hd_group(phrase, "");
    addr = wallet.data.generate_next_hd_address(hdGroup_id.data);
    address = addr.data.address().data;
    wallet.data.delete_hd_group(hdGroup_id.data);

    if (address.indexOf('0000') == 0) {
      process.stdout.write(`\rFINISH! Attempts=${count} Mnemophrase="${phrase}" Addr=0x${address}`);     
      break;
    }

    if ((count % 10) == 0) {
      process.stdout.write(`\rPROGRESS: Attempts=${count}`);
    }

  }



}

async function generatePriv() {

  const unoInstance = await Module();
  const wallet = unoInstance.UnoSemuxWallet.new_wallet();

  process.stdout.write(`\rSTART!`);

  while (true) {
    count++;
    addr = wallet.data.generate_random_address();
    priv = addr.data.private_key().data;
    address = addr.data.address().data;
    wallet.data.delete_address(address);

    if (address.indexOf('00000') == 0) {
      process.stdout.write(`\rFINISH! Attempts=${count} Priv="${priv}" Addr=0x${address}`);
      break;
    }
    if ((count % 1000) == 0) {
      process.stdout.write(`\rPROGRESS: Attempts=${count}`);
    }
  }


}

generatePriv();
// generateHD();