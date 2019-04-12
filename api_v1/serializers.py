from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        for f in UserSerializer.Meta.fields + UserSerializer.Meta.write_only_fields:
            set_attr(instance, f, validated_data[f])
        instance.set_password(validated_data['password'])
        instance.save()
        return instance
