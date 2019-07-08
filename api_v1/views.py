from rest_framework import viewsets, permissions, status, views
from rest_framework.response import Response
from django.http import HttpResponseRedirect
from .serializers import UserSerializer, UserSerializerWithToken
from django.contrib.auth.models import User


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        print('REQUEST {}'.format(request.data))

    def retrieve(self, request, pk=None):
        if pk == 'i':
            return Response(UserSerializer(request.user,
                context={'request':request}).data)
        return super(UserViewSet, self).retrieve(request, pk)
