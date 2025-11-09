from django.urls import path
from .views import ResultadosView

urlpatterns = [
    path('resultados/', ResultadosView.as_view(), name='resultados_list'),
    path('resultados/<int:id_resultado>/', ResultadosView.as_view(), name='resultado_detail'),
]
