function print(code, msg) {
    document.write('<b>'+code + "</b>:<br />");
    document.write(msg + "<br /><br />");
}

var generator = new JSEncrypt({default_key_size : 1024});
generator.getKey();

var symetric = 'this is symetric key';
var private = generator.getPrivateKey();
var public = generator.getPublicKey();

print("Private", private);
print("public", public);
print("symetric", symetric);


var encoder = new JSEncrypt();
encoder.setPrivateKey(private);
var encodedByPrivate = encoder.encrypt(symetric);
print("encoded by private key", encodedByPrivate);

var decoder = new JSEncrypt();
decoder.setPrivateKey(private);
var decodedByPrivate = decoder.decrypt(encodedByPrivate);
print("decoded by private key", decodedByPrivate);

var encoder = new JSEncrypt();
encoder.setPublicKey(public);
var encodedByPublic = encoder.encrypt(symetric);
print("encoded by public key", encodedByPublic);

var decoder = new JSEncrypt();
decoder.setPrivateKey(private);
var decodedByPrivate = decoder.decrypt(encodedByPublic);
print("decoded by private key", decodedByPrivate);

var decoder = new JSEncrypt();
decoder.setPublicKey(public);
var decodedByPublic = decoder.decrypt(encodedByPublic);
print("decoded by public key", decodedByPublic);

