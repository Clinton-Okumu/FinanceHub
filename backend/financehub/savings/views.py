from rest_framework import generics, permissions
from .models import SavingsGoal
from .serializers import SavingsGoalSerializer

class SavingsGoalListCreateView(generics.ListCreateAPIView):
    serializer_class = SavingsGoalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return savings goals only for the logged-in user
        return SavingsGoal.objects.filter(user=self.request.user)

class SavingsGoalDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SavingsGoalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return savings goals only for the logged-in user
        return SavingsGoal.objects.filter(user=self.request.user)
