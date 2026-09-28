from django.db import models

# Create your models here.
from django.db import models

class HistoricoCalculo(models.Model):
    expressao = models.CharField(max_length=255, verbose_name="Expressão")
    resultado = models.CharField(max_length=255, verbose_name="Resultado")
    criado_em = models.DateTimeField(auto_now_add=True, verbose_name="Data/Hora")

    class Meta:
        ordering = ['-criado_em']  # Ordena do cálculo mais recente para o mais antigo

    def __str__(self):
        return f"{self.expressao} = {self.resultado}"