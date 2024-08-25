from rest_framework import views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .utils import get_total_expenses, get_total_income, get_budget_usage, get_savings_progress
from .serializers import AnalyticsSerializer

class AnalyticsView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        total_income = get_total_income(user)
        total_expenses = get_total_expenses(user)
        budget_usage = get_budget_usage(user)
        savings_progress = get_savings_progress(user)

        data = {
            'total_income': total_income,
            'total_expenses': total_expenses,
            'budget_usage': budget_usage,
            'savings_progress': savings_progress
        }
        
        serializer = AnalyticsSerializer(data)
        return Response(serializer.data)
