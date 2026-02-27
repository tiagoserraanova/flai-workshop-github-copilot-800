from django.core.management.base import BaseCommand
from octofit_tracker.models import OctoFitUser, Team, Activity, Leaderboard, Workout
from datetime import date


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Clearing existing data...')

        # Delete existing data using Django ORM
        OctoFitUser.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write('Populating users...')

        # Create Marvel superheroes
        spider_man = OctoFitUser.objects.create(
            name='Spider-Man',
            email='spiderman@marvel.com',
            age=25,
            fitness_goal='Balance work and hero life',
            profile_picture='spider_man.png'
        )
        iron_man = OctoFitUser.objects.create(
            name='Iron Man',
            email='ironman@marvel.com',
            age=45,
            fitness_goal='Maintain genius-level physique',
            profile_picture='iron_man.png'
        )
        captain_america = OctoFitUser.objects.create(
            name='Captain America',
            email='cap@marvel.com',
            age=100,
            fitness_goal='Stay super soldier fit',
            profile_picture='cap.png'
        )
        thor = OctoFitUser.objects.create(
            name='Thor',
            email='thor@marvel.com',
            age=1500,
            fitness_goal='Worthy of Mjolnir',
            profile_picture='thor.png'
        )

        # Create DC superheroes
        batman = OctoFitUser.objects.create(
            name='Batman',
            email='batman@dc.com',
            age=35,
            fitness_goal='Peak human condition',
            profile_picture='batman.png'
        )
        superman = OctoFitUser.objects.create(
            name='Superman',
            email='superman@dc.com',
            age=35,
            fitness_goal='Protect Metropolis',
            profile_picture='superman.png'
        )
        wonder_woman = OctoFitUser.objects.create(
            name='Wonder Woman',
            email='wonderwoman@dc.com',
            age=800,
            fitness_goal='Champion of Themyscira',
            profile_picture='wonder_woman.png'
        )
        the_flash = OctoFitUser.objects.create(
            name='The Flash',
            email='flash@dc.com',
            age=28,
            fitness_goal='Fastest hero alive',
            profile_picture='flash.png'
        )

        self.stdout.write('Populating teams...')

        # Create Team Marvel
        team_marvel = Team.objects.create(
            name='Team Marvel',
            description='Earth\'s Mightiest Heroes - Avengers Assemble!',
            members=['Spider-Man', 'Iron Man', 'Captain America', 'Thor']
        )

        # Create Team DC
        team_dc = Team.objects.create(
            name='Team DC',
            description='Justice League - Protecting the world together!',
            members=['Batman', 'Superman', 'Wonder Woman', 'The Flash']
        )

        self.stdout.write('Populating activities...')

        # Activities for Marvel heroes
        Activity.objects.create(
            user='Spider-Man',
            activity_type='Web Slinging',
            duration=60,
            date=date(2025, 1, 15)
        )
        Activity.objects.create(
            user='Iron Man',
            activity_type='Flight Training',
            duration=45,
            date=date(2025, 1, 15)
        )
        Activity.objects.create(
            user='Captain America',
            activity_type='Shield Throwing',
            duration=30,
            date=date(2025, 1, 16)
        )
        Activity.objects.create(
            user='Thor',
            activity_type='Hammer Lifting',
            duration=90,
            date=date(2025, 1, 16)
        )

        # Activities for DC heroes
        Activity.objects.create(
            user='Batman',
            activity_type='Martial Arts',
            duration=120,
            date=date(2025, 1, 17)
        )
        Activity.objects.create(
            user='Superman',
            activity_type='Flying',
            duration=60,
            date=date(2025, 1, 17)
        )
        Activity.objects.create(
            user='Wonder Woman',
            activity_type='Sword Training',
            duration=75,
            date=date(2025, 1, 18)
        )
        Activity.objects.create(
            user='The Flash',
            activity_type='Speed Running',
            duration=15,
            date=date(2025, 1, 18)
        )

        self.stdout.write('Populating leaderboard...')

        # Leaderboard entries
        Leaderboard.objects.create(user='Thor', score=1500)
        Leaderboard.objects.create(user='Superman', score=1400)
        Leaderboard.objects.create(user='Wonder Woman', score=1300)
        Leaderboard.objects.create(user='Captain America', score=1200)
        Leaderboard.objects.create(user='Batman', score=1100)
        Leaderboard.objects.create(user='Iron Man', score=1000)
        Leaderboard.objects.create(user='Spider-Man', score=900)
        Leaderboard.objects.create(user='The Flash', score=800)

        self.stdout.write('Populating workouts...')

        # Workouts for heroes
        Workout.objects.create(
            name='Avengers Training Protocol',
            description='Standard Avengers training regimen',
            exercises=['Push-ups', 'Pull-ups', 'Squats', 'Shield drills'],
            duration=90
        )
        Workout.objects.create(
            name='Justice League Workout',
            description='Justice League strength and agility training',
            exercises=['Martial arts', 'Sprint drills', 'Strength training', 'Combat simulation'],
            duration=120
        )
        Workout.objects.create(
            name='Web Slinging Cardio',
            description='Spider-Man inspired aerial workout',
            exercises=['Rope climbing', 'Acrobatics', 'Core training', 'Balance exercises'],
            duration=60
        )
        Workout.objects.create(
            name='Bat-Cave Circuit',
            description='Batman\'s full body conditioning routine',
            exercises=['Chin-ups', 'Box jumps', 'Agility ladder', 'Combat drills'],
            duration=75
        )
        Workout.objects.create(
            name='Thunder God Strength',
            description='Thor\'s legendary strength training',
            exercises=['Deadlifts', 'Overhead press', 'Hammer drills', 'Norse sparring'],
            duration=90
        )

        self.stdout.write(self.style.SUCCESS('Successfully populated the octofit_db database with superhero test data!'))
        self.stdout.write(f'Users created: {OctoFitUser.objects.count()}')
        self.stdout.write(f'Teams created: {Team.objects.count()}')
        self.stdout.write(f'Activities created: {Activity.objects.count()}')
        self.stdout.write(f'Leaderboard entries created: {Leaderboard.objects.count()}')
        self.stdout.write(f'Workouts created: {Workout.objects.count()}')
