from rest_framework import serializers
from .models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'user', 'category', 'amount', 'description', 'date', 'created_at', 'updated_at']
        read_only_fields = ['user', 'created_at', 'updated_at']

    def create(self, validated_data):
        # Ensure the transaction is linked to the current logged-in user
        user = self.context['request'].user
        transaction = Transaction.objects.create(user=user, **validated_data)
        return transaction
