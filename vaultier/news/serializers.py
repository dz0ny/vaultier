from rest_framework import serializers


class NewsSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    text = serializers.CharField()
    title = serializers.CharField()
    link = serializers.URLField()
    published_at = serializers.DateTimeField()
