from rest_framework import serializers
from .models import OctoFitUser, Team, Activity, Leaderboard, Workout


class OctoFitUserSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    def get_id(self, obj):
        return str(obj.pk)

    class Meta:
        model = OctoFitUser
        fields = ['id', 'username', 'name', 'email', 'age', 'fitness_goal', 'profile_picture', 'team']


class TeamSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    def get_id(self, obj):
        return str(obj.pk)

    class Meta:
        model = Team
        fields = ['id', 'name', 'description', 'members']


class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    def get_id(self, obj):
        return str(obj.pk)

    class Meta:
        model = Activity
        fields = ['id', 'user', 'activity_type', 'duration', 'date']


class LeaderboardSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    def get_id(self, obj):
        return str(obj.pk)

    class Meta:
        model = Leaderboard
        fields = ['id', 'user', 'score', 'team', 'calories']


class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    def get_id(self, obj):
        return str(obj.pk)

    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'exercises', 'duration']
