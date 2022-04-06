# Entrega 01 - Ilusiones ópticas

# Introducción
Se presentará el efecto estroboscópico en el cual se parte de imágenes que se presentan de forma continua generando lo que parece ser un movimiento fluido, esto debido al efecto Phi, dentro de los posibles consecuencias que este efecto puede llegar a tener se encuentra una que relaciona el movimiento y la percepción de los colores en las pantallas de los computadores. Al seguir los pasos del trabajo realizado por Michael Bach fue posible reproducir el fenómeno. Para mostrar el trabajo realizado primero se hará una breve contextualización desde la teoría del fenómeno, luego este será reproducido utilizando p5.js y por último se concluirá  acerca de lo hallado.
Contexto
## Aliasing
Es un fenómeno que causa que diferentes señales se vuelven indistinguibles (o alias de otras) cuando son muestreadas. También se refiere a cuando una señal reconstruida a través de muestras es distinta a su original continua. Cuando este fenómeno se presenta con muestras en el tiempo, como el efecto estroboscópico, se denomina aliasing temporal; cuando se presenta con muestras en el espacio, como con los patrones moiré, se denomina aliasing espacial.
## Efecto estroboscópico
Es un efecto óptico causado por el aliasing. Se produce cuando el movimiento rotacional o cíclico es representado por muestras cortas o instantáneas a una tasa de muestreo cercana a la del periodo del movimiento. Este efecto fue crucial para el desarrollo de la animación y del cine.
## Fenómeno phi
Es una ilusión óptica en la que se aparenta movimiento cuando en realidad se presentan una serie de imágenes estáticas con una frecuencia relativamente alta.

# Resultados [presentar código]

{{< details title="p5-iframe markdown" open=false >}}
```html
{{</* p5-iframe sketch="/project/sketches/rgb.js" width="725" height="425 */>}}
```
{{< /details >}}

{{< p5-iframe sketch="/project/sketches/rgb.js" width="725" height="425" >}}


# Conclusiones y trabajo futuro
Como se observa la velocidad y tasa de actualización de píxeles de la pantalla juega en contra cuando se desea tener precisión en ciertos aspectos de los estímulos que se nos están presentando mediante este medio, como lo es la sensación de movimiento continuo y la mezcla de los colores causado por la velocidad a la cual se están presentando los segmentos del círculo. La velocidad a la cual aparentemente se encuentra girando el círculo define si se van a ver los colores que originalmente se definieron o la combinación de estos.

# Recursos
Raster-scan cathode-ray tubes for vision research--limits of resolution in space, time and intensity, and some solutions. (1997). Spatial Vision, 10(4), 403-414.



