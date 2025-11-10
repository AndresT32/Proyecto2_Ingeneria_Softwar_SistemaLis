from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
from .models import Login
import json

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):

    def get(self, request, id=None):
        if id:
            users = list(Login.objects.filter(id=id).values())
            if len(users) > 0:
                datos = {"message": "Success", "user": users[0]}
            else:
                datos = {"message": "User not found"}
        else:
            users = list(Login.objects.values())
            datos = {"message": "Success", "users": users}
        return JsonResponse(datos)

    def post(self, request):
        data = json.loads(request.body)

        accion = data.get("accion")
        username = data.get("username")
        password = data.get("password")

        # ==========================
        # ✅ 1. REGISTRO DE USUARIO
        # ==========================
        if accion == "registro":

            if Login.objects.filter(username=username).exists():
                return JsonResponse({"success": False, "error": "El usuario ya existe"}, status=400)

            hashed_password = make_password(password)

            Login.objects.create(
                username=username,
                password=hashed_password
            )

            return JsonResponse({
                "success": True,
                "message": "Usuario registrado correctamente"
            })

        # ==========================
        # ✅ 2. LOGIN DE USUARIO
        # ==========================
        if accion == "login":

            try:
                user = Login.objects.get(username=username)

                if check_password(password, user.password):
                    return JsonResponse({
                        "success": True,
                        "usuario": username,
                        "mensaje": "Inicio de sesión exitoso"
                    })
                else:
                    return JsonResponse({
                        "success": False,
                        "error": "Contraseña incorrecta"
                    }, status=401)

            except Login.DoesNotExist:
                return JsonResponse({
                    "success": False,
                    "error": "Usuario no encontrado"
                }, status=404)

        return JsonResponse({"success": False, "error": "Acción no válida"}, status=400)
