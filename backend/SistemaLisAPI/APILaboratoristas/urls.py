from django.urls import path
from .views import LaboratoristasView

urlpatterns = [
    path('laboratoristas/', LaboratoristasView.as_view(), name='laboratoristas_list'),
    path('laboratoristas/<str:cod_laboratorista>/', LaboratoristasView.as_view(), name='laboratoristas_process'),
]
