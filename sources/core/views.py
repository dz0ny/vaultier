from django.http.response import HttpResponse
from django.shortcuts import render

from core.mailer.invitation import render_email, build_context
from core.models.member import Member
from core.models.member_fields import MemberStatusField


def index(request):
    return render(request, 'boostrap.html')

def dev_mail(request):
    context = build_context(Member.objects.filter(status=MemberStatusField.STATUS_INVITED).reverse()[0])
    plain, html = render_email('mailer/invitation', context)
    return HttpResponse(html)
