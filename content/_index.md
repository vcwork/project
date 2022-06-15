---
title: Introduction
type: docs
---

# Computación visual 2022-I

## Integrantes

### Oscar Alejandro Gómez Suarez

Estudiante octavo semestre, con interes en la animación (con respecto a la materia) y poderla usar como un medio para contar una historia. En los tiempos libres gusta de leer y escuchar historias. 

### Fernando Moreno Bautista

Estudiante de noveno semestre, me gusta la programación en general, encuentro algo interesante en este tema ya que hoy en dia nos rodean los algoritmos para cada cosa que hagamos en el día a día. En mis tiempos libres me gusta la música y practicar el Skateboarding.

### Gerson Nicolás Pineda Lara

Estudiante de 9no semestre, apasionado por la inteligencia artifical, las redes de computadores y las matemáticas (en general). En sus tiempos libres gusta de practicar calistenia y de construir imperios en Age of Empires II.

## Log de encuentros

### Lunes 4 de abril del 2022

Se examinó documentación sobre el efecto estroboscópico tanto en la vida real como en los sistemas computacionales. Se determinó que había otros efectos involucrados que también debían ser examinados a profundidad para entender el efecto estroboscópico.

### Miércoles 4 de mayo del 2022

Se estudió a profundidad el código de *3DBrush* para entender su funcionamiento. Luego, se realizaron propuestas para desarrollar el taller para que, al final, se determinara trabajar con el dispositivo Leap Motion e iniciara el proceso de entendimiento del dispositivo.

### Lunes 9 de mayo del 2022

Tras disponer del dispositivo Leap Motion se inició la implementación de la librería para comprobar su funcionamiento e integrarlo al código ya dispuesto. Se revisó la documentación disponible en la página del fabricante, así como se consultó la información disponible en foros, pero no fue posible lograr la interconexión entre el código JS y el dispositivo. Se exploraron otras tecnologías y metodologías, en general centradas en detectar gestos y profundidad de la mano a través de la cámara integrada del computador.

### Miércoles 11 de mayo del 2022

Se determina dejar de lado la tecnología Leap debido a los problemas técnicos que impidieron su funcionamiento integrado con JS. Como ya se preveía la dificultad de determinar la profundidad de un objeto frente a una cámara, se decide explorar el uso de gestos de mano. Para esto se examina Media Pipe, una librería de código libre que ofrece soluciones de aprendizaje de máquina para su implementación en *streaming media*. Mediante esta librería es posible hacer seguimiento a puntos específicos de la mano mediante la *webcam*.

### Lunes 16 de mayo del 2022

Se continúa en la exploración e implementación de la librería Media Pipe. Se procesa la información retornada por la librería para procesar el movimiento de la brocha en *3DBrush*. Por otro lado, también se examina la librería ML5. Aunque Media Pipe, en efecto, es capaz de detectar las coordenadas e imprimirlas en consola, no ha sido posible procesarlas para usarlas en el código.

### Miércoles 18 de mayo del 2022

Se continúa en la exploración e implemetación de las librerías Media Pipe y ML5. Se evidencia que la librería Media Pipe puede causar que la cámara del dispositivo falle de manera aleatorio, por lo que se analiza cambiar el punto que se está desarrollando.

### Lunes 6 de junio del 2022

Se inicia a trabajar en la entrega tratando de ejecutar en local los códigos de *Programming paradigm* y *Coloring*. Se les realizan algunas modificaciones menores y se observa su comportamiento para comprender mejor su estructura.

### Miércoles 8 de junio del 2022

Ahora se copian y ejecutan localmente los códigos de *Coloring* y *Texturing*, explorando cómo las modificaciones en algunos parámetros cambian el comportamiento del programa. Por primera vez se evidencia un error en la compilación de GitHub pages que impide el despliegue de la página, por lo que paralelamente se inicia a trabajar en la solución de este error.

### Lunes 13 de junio del 2022

Se explora el código de *luma* ejecutándolo en local y cambiando algunos de sus parámetros, con el fin comprender su funcionamiento. Por otro lado, se sigue trabajando en solucionar el error de despliegue y, por sugerencia del profesor, se tratará de eliminar las vistas y el código innecesario dentro de la plantilla de Showcase.

### Miércoles 15 de junio del 2022


