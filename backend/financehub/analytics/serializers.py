from rest_framework import serializers

class BudgetUsageSerializer(serializers.Serializer):
    category = serializers.CharField(max_length=255)
    usage = serializers.FloatField()

class SavingsProgressSerializer(serializers.Serializer):
    goal = serializers.CharField(max_length=255)
    progress = serializers.FloatField()

class AnalyticsSerializer(serializers.Serializer):
    total_income = serializers.DecimalField(max_digits=10, decimal_places=2)
    total_expenses = serializers.DecimalField(max_digits=10, decimal_places=2)
    budget_usage = BudgetUsageSerializer(many=True)
    savings_progress = SavingsProgressSerializer(many=True)
