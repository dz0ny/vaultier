function print(code, msg) {
    document.write('<b>'+code + "</b>:<br />");
    document.write(msg + "<br /><br />");
}

var generator = new JSEncrypt({default_key_size : 1024});
generator.getKey();

var symetric = 'this is symetric key';
var private = generator.getPrivateKey();
var public = generator.getPublicKey();
var private = ''
private = private +  'MIIEpgIBAAKCAQEA2Psa17fQL+dzSLBTY59WFw1ptfczCwnMtPlvlncLhP0WumRQ'
private = private +  'zrj37VDPckc5SrHKEeA5kPVh4bP8IwdPP77z++KmZDoAaIBSRPR70/NJy8RRj0Ye'
private = private +  'lzPeM0QPfOxiLBdV9VqIAb5R5muIPQ+mquEXRrgda0u/DDh2zPPgIxpMhhM8dukl'
private = private +  'Vp2O8+P+2OWqMEGvsOk2Dmn4982KztP6Ic9wjswpMON6eKWczVZ4c/EmmCtToysL'
private = private +  '29JOhTgHHhRYUGDcTUyb/NAJmO8RPxbOaVF9OQ0Kow8O3pz+TkSS2Vy+FT/PogmX'
private = private +  'Dn6eF7FAXnCo5bQQexgTBkrD1v3zbsoJQR4gZQIDAQABAoIBAQDAvTUX37CvjNHM'
private = private +  'BMzeFoBbk8+OEtqleHv9WgD0UCTMaiCRS2C4cHfSt1C+e2P55LnRbTLVgBMFcWKM'
private = private +  'HwcXYeDKo4cYSqloKmxp0h5YpKitt2KXeTrdJva+5Ts4xaVi8wupGVTs74lCu8xW'
private = private +  'KRvseGu7pvqC/9Lh4RoubodvxwGoqbSmnKBfiaKj1v+Edp2ACqqLz9izBOcBkiFJ'
private = private +  'tDCF9Z0stCDeHewiucQeQZNXxu06iFywwnGRFwM4AiZoruy2iRxFKyGObPB7lU/B'
private = private +  'TQGUwDD2LTDiehShaHNcIq4/z228caolRdNimHivuKtZGzDJSbfn4dx2B0OCzZTZ'
private = private +  'Q/NTsiCVAoGBAPU1M54kaTdDxReVux36B0pz2YThryfU3VA0Kz4iVSjgIJ2hnvch'
private = private +  'cKVLO1d7H6xneZhU+pCQ7sJn/uGE6vrWKkm/LvNwhApDl9Tf+HdfpXZi+Yd6NqFO'
private = private +  'llTUCSUPzaN8i7FKF5auHpXoLToU6ZtgpChAjuEl3Nw9La2vESNk+/e7AoGBAOKH'
private = private +  '3Y783OOKEQBW2CpNnP0yNyGFvtut+SpNqUz3DAwoDYBNDRYAwc01akEvuWNIGpoh'
private = private +  'VZlyvIOJ+LnmaS4H5HD+BF6frcfKbeYlsVXh3ww0NnD8djEib45xicJ7GtGQQjZM'
private = private +  'BPpoP0zaAmLdPKgRSYJQazqTTYuqpHG2GNb693ZfAoGBANFcP1pDFGLPRjTA7ybF'
private = private +  'F/yFta8zUm3b3aphIJrIjZV859wu5p9yuc8n0N78jSqSnstloxpT5MewK3s6Fbdd'
private = private +  'rHWS+u93ngV1eOmU4Xxq+cd+8jauLn7Drq926uft+lIgQNV6wXEx8YNk3Vi+CkdT'
private = private +  '2FVV6ahqv4x738hvtV5XFpuJAoGBAIPz/nQPCSAlyXd4HtytbxfxyzlkreNK+MvS'
private = private +  'hx7E/SiLoCmvOEMr17gQOD+WbBfP5WcIqdMDiZnZoZ+v/m6IvGGxJZx0yQaK/O9F'
private = private +  '34GWW5XBSEESXkqKs462xjcZ/Go77MWyDGhMlyrOBvvNwUppH3egHoX1TgNgN//g'
private = private +  'waFgeQtjAoGBAIbS2w7HSwBLjjvgH3381UjszCMw9V2zhnvb2qNxg81QsL9NRywx'
private = private +  'el9/OoaohAVBb4+Ew9e9MbG4vjRKubIo6mSXyiVjoQ/l6UJfrLn9bP4rfm9ZpaCU'
private = private +  '12WD3jSbKV31m5ROy100enxFO8KZ8Mb1SCty54kxwx5k5GR2+K/ChpVs'

var public = 'AAAAB3NzaC1yc2EAAAADAQABAAABAQDY+xrXt9Av53NIsFNjn1YXDWm19zMLCcy0+W+WdwuE/Ra6ZFDOuPftUM9yRzlKscoR4DmQ9WHhs/wjB08/vvP74qZkOgBogFJE9HvT80nLxFGPRh6XM94zRA987GIsF1X1WogBvlHma4g9D6aq4RdGuB1rS78MOHbM8+AjGkyGEzx26SVWnY7z4/7Y5aowQa+w6TYOafj3zYrO0/ohz3COzCkw43p4pZzNVnhz8SaYK1OjKwvb0k6FOAceFFhQYNxNTJv80AmY7xE/Fs5pUX05DQqjDw7enP5ORJLZXL4VP8+iCZcOfp4XsUBecKjltBB7GBMGSsPW/fNuyglBHiBl'

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

