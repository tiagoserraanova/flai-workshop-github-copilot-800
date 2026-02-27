from django.test import TestCase
from .models import OctoFitUser, Team, Activity, Leaderboard, Workout
from datetime import date


class OctoFitUserTestCase(TestCase):
    def setUp(self):
        OctoFitUser.objects.create(name="Spider-Man", email="spider@marvel.com", age=25, fitness_goal="Save the city")

    def test_user_created(self):
        user = OctoFitUser.objects.get(email="spider@marvel.com")
        self.assertEqual(user.name, "Spider-Man")


class TeamTestCase(TestCase):
    def setUp(self):
        Team.objects.create(name="Team Marvel", description="Marvel superheroes")

    def test_team_created(self):
        team = Team.objects.get(name="Team Marvel")
        self.assertEqual(team.description, "Marvel superheroes")


class ActivityTestCase(TestCase):
    def setUp(self):
        Activity.objects.create(user="Spider-Man", activity_type="Running", duration=30, date=date.today())

    def test_activity_created(self):
        activity = Activity.objects.get(user="Spider-Man")
        self.assertEqual(activity.activity_type, "Running")


class LeaderboardTestCase(TestCase):
    def setUp(self):
        Leaderboard.objects.create(user="Iron Man", score=1000)

    def test_leaderboard_entry_created(self):
        entry = Leaderboard.objects.get(user="Iron Man")
        self.assertEqual(entry.score, 1000)


class WorkoutTestCase(TestCase):
    def setUp(self):
        Workout.objects.create(name="Hero Training", description="Train like a hero", duration=45)

    def test_workout_created(self):
        workout = Workout.objects.get(name="Hero Training")
        self.assertEqual(workout.duration, 45)
