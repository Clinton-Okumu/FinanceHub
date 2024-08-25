from transactions.models import Transaction
from budgets.models import Budget
from savings.models import SavingsGoal

#from .models import Transaction, Budget, SavingsGoal
from django.db.models import Sum

def get_total_expenses(user):
    return Transaction.objects.filter(user=user, category='expense').aggregate(total_spent=Sum('amount'))['total_spent'] or 0

def get_total_income(user):
    return Transaction.objects.filter(user=user, category='income').aggregate(total_income=Sum('amount'))['total_income'] or 0

def get_budget_usage(user):
    budgets = Budget.objects.filter(user=user)
    budget_usage = []
    for budget in budgets:
        usage = (budget.spent_amount / budget.allocated_amount) * 100 if budget.allocated_amount > 0 else 0
        budget_usage.append({'category': budget.category, 'usage': usage})
    return budget_usage

def get_savings_progress(user):
    savings_goals = SavingsGoal.objects.filter(user=user)
    progress = []
    for goal in savings_goals:
        progress_percentage = (goal.current_savings / goal.target_amount) * 100 if goal.target_amount > 0 else 0
        progress.append({'goal': goal, 'progress': progress_percentage})
    return progress
