from rest_framework import serializers
from .models import SavingsGoal

class SavingsGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavingsGoal
        fields = ['id', 'user', 'name', 'target_amount', 'current_savings', 'deadline', 'created_at', 'updated_at']
        read_only_fields = ['user', 'created_at', 'updated_at']

    def create(self, validated_data):
        # Ensure the savings goal is linked to the current logged-in user
        user = self.context['request'].user
        savings_goal = SavingsGoal.objects.create(user=user, **validated_data)
        return savings_goal
