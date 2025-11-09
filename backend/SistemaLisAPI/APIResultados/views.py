from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from APIPaciente.models import Pacientes
from APILaboratoristas.models import Laboratoristas
from .models import Resultado
import json

@method_decorator(csrf_exempt, name='dispatch')
class ResultadosView(View):

    def get(self, request, id_resultado=None):
        if id_resultado:
            resultados = list(Resultado.objects.filter(id_resultado=id_resultado)
                              .select_related('cod_ingreso', 'cod_laboratorista')
                              .values(
                                  'id_resultado',
                                  'hdl', 'ldl', 'trigliceridos',
                                  'cod_ingreso__cod_ingreso',
                                  'cod_ingreso__nombre',
                                  'cod_ingreso__apellido',
                                  'cod_laboratorista__cod_laboratorista',
                                  'cod_laboratorista__nombre',
                                  'cod_laboratorista__apellido'
                              ))
            if resultados:
                return JsonResponse({"message": "Success", "resultado": resultados[0]})
            else:
                return JsonResponse({"message": "Resultado not found"})
        else:
            resultados = list(Resultado.objects
                              .select_related('cod_ingreso', 'cod_laboratorista')
                              .values(
                                  'id_resultado',
                                  'hdl', 'ldl', 'trigliceridos',
                                  'cod_ingreso__cod_ingreso',      # ✅ se agregó
                                  'cod_ingreso__nombre',
                                  'cod_ingreso__apellido',
                                  'cod_laboratorista__cod_laboratorista',
                                  'cod_laboratorista__nombre',
                                  'cod_laboratorista__apellido'
                              ))
            return JsonResponse({"message": "Success", "resultados": resultados})

    def post(self, request):
        data = json.loads(request.body)

        if not Pacientes.objects.filter(cod_ingreso=data["cod_ingreso"]).exists():
            return JsonResponse({"message": "El paciente no existe"}, status=400)

        if not Laboratoristas.objects.filter(cod_laboratorista=data["cod_laboratorista"]).exists():
            return JsonResponse({"message": "El laboratorista no existe"}, status=400)

        Resultado.objects.create(
            cod_ingreso_id=data["cod_ingreso"],
            hdl=data["hdl"],
            ldl=data["ldl"],
            trigliceridos=data["trigliceridos"],
            cod_laboratorista_id=data["cod_laboratorista"]
        )

        return JsonResponse({"message": "Resultado creado exitosamente"})

    def put(self, request, id_resultado):
        data = json.loads(request.body)
        resultado = Resultado.objects.filter(id_resultado=id_resultado)
        if resultado.exists():
            r = resultado.first()
            r.cod_ingreso_id = data["cod_ingreso"]
            r.cod_laboratorista_id = data["cod_laboratorista"]
            r.hdl = data["hdl"]
            r.ldl = data["ldl"]
            r.trigliceridos = data["trigliceridos"]
            r.save()
            return JsonResponse({"message": "Updated"})
        else:
            return JsonResponse({"message": "Resultado not found"})

    def delete(self, request, id_resultado):
        resultado = Resultado.objects.filter(id_resultado=id_resultado)
        if resultado.exists():
            resultado.delete()
            return JsonResponse({"message": "Deleted successfully"})
        else:
            return JsonResponse({"message": "Resultado not found"})
