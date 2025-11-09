from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import Laboratoristas
import json
from datetime import datetime


@method_decorator(csrf_exempt, name='dispatch')
class LaboratoristasView(View):

    # ✅ Obtener todos o uno
    def get(self, request, cod_laboratorista=None):
        if cod_laboratorista:
            laboratorista = list(Laboratoristas.objects.filter(cod_laboratorista=cod_laboratorista).values())
            if laboratorista:
                return JsonResponse({
                    "message": "Success",
                    "laboratorista": laboratorista[0]
                })
            else:
                return JsonResponse({"message": "Laboratorista not found"})
        else:
            laboratoristas = list(Laboratoristas.objects.values())
            if laboratoristas:
                return JsonResponse({
                    "message": "Success",
                    "laboratoristas": laboratoristas
                })
            else:
                return JsonResponse({"message": "No laboratoristas found"})

    # ✅ Crear laboratorista con código automático LAB-YYYYMMDD-0001
    def post(self, request):
        data = json.loads(request.body)
        fecha_hoy = datetime.now().strftime("%Y%m%d")

        # Buscar códigos existentes hoy
        codigos = Laboratoristas.objects.filter(
            cod_laboratorista__contains=fecha_hoy
        ).values_list('cod_laboratorista', flat=True)

        # Extraer números finales (ej: "0001")
        numeros = sorted([
            int(c.split('-')[-1]) for c in codigos
        ]) if codigos else []

        # Buscar primer consecutivo faltante
        consecutivo_num = 1
        for n in numeros:
            if n != consecutivo_num:
                break
            consecutivo_num += 1

        consecutivo = str(consecutivo_num).zfill(4)
        cod_laboratorista = f"LAB-{fecha_hoy}-{consecutivo}"

        # Crear registro
        Laboratoristas.objects.create(
            cod_laboratorista=cod_laboratorista,
            nombre=data["nombre"],
            apellido=data["apellido"],
            telefono=data["telefono"],
            profesion=data["profesion"]
        )

        return JsonResponse({
            "message": "Success",
            "cod_laboratorista": cod_laboratorista
        })

    # ✅ Actualizar laboratorista
    def put(self, request, cod_laboratorista):
        data = json.loads(request.body)
        lab = Laboratoristas.objects.filter(cod_laboratorista=cod_laboratorista)
        if lab.exists():
            lab = lab.first()
            lab.nombre = data["nombre"]
            lab.apellido = data["apellido"]
            lab.telefono = data["telefono"]
            lab.profesion = data["profesion"]
            lab.save()
            return JsonResponse({"message": "Success"})
        else:
            return JsonResponse({"message": "Laboratorista not found"})

    # ✅ Eliminar laboratorista
    def delete(self, request, cod_laboratorista):
        lab = Laboratoristas.objects.filter(cod_laboratorista=cod_laboratorista)
        if lab.exists():
            lab.delete()
            return JsonResponse({"message": "Deleted successfully"})
        else:
            return JsonResponse({"message": "Laboratorista not found"})
