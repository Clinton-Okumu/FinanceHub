from rest_framework import serializers
from .models import Budget

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ['id', 'user', 'category', 'allocated_amount', 'spent_amount', 'created_at', 'updated_at']
        read_only_fields = ['user', 'spent_amount', 'created_at', 'updated_at']

    def create(self, validated_data):
        # Ensure that the budget is created for the current logged-in user
        user = self.context['request'].user
        budget = Budget.objects.create(user=user, **validated_data)
        return budget
