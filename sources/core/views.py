from django.shortcuts import render
import hashlib

def index(request):
    md5 = hashlib.md5()
    md5.update('jan.misek@rclick.cz');
    avatar = md5.hexdigest()
    return render(request, 'vaults.html',{ 'avatar': avatar })
