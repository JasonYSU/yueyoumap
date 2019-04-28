from rest_framework import serializers


class UserSerializer(serializers.Serializer):
    naturename = serializers.CharField()
    token = serializers.CharField()

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass
