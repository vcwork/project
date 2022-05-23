# Entrega 02

## Ray tracing


## Introducción
El ray tracing es una de las dos soluciones más populares dadas para el renderizado de objetos de tres dimensiones en pantallas de sólo dos. Esta técnica permite la creación de imágenes que se asemejan a la realidad de una forma relativamente sencilla. A continuación se muestra la historia de la técnica, la  teoría que se encuentra detrás y una aplicación que permite visualizar a rasgos generales como es el funcionamiento del ray tracing, es decir la realización de una prueba de concepto. De la revisión del marco teórico es posible concluir que esta técnica es cada vez más usada debido a los adelantos computacionales y las nuevas necesidades que surgen en la computación gráfica. 

## Contexto

### Historia
Con la finalidad de obtener en las pantallas objetos cada vez más parecidos a los que se encuentran en la realidad se comenzó a intentar producir los gráficos con conceptos de física, en donde era posible ver mediante los rayos de luz que llegaban al observador, este proceso en el cual se seguía un rayo de luz que salía de una fuente de luz hasta llegar al observador para formar una imagen fue llamado Ray Tracing. En el momento en el que se tuvo el concepto y la idea de realizar este tipo de procesado de las imágenes no era posible debido a su costo computacional (1960). Con el paso del tiempo se ha podido mejorar los algoritmos y además se tiene mayor capacidad de cómputo con lo cual se ha llegado al tratamiento de aspectos cada vez más complejos como lo son los reflejos, las sombras o el efecto que se produce en las imágenes en movimiento (Glassner, 2019).

### Funcionamiento

Como ya se había señalado anteriormente, el Ray Tracing se inspira en la física de la visión, por lo tanto se parte de un punto focal que vendría a ser el ojo del observador al cual llegan los rayos de luz, además se tiene un plano de proyección que es en el cual se verá la imagen, este es el que será emulado por la pantalla en donde se esté observando la imagen, este plano usualmente se subdivide en la cantidad de pixeles que tiene la pantalla. Si se parte de una fuente de luz esta rebota en los objetos y pasa directamente hacia el plano de proyección y después impacta contra el punto focal tal y como se muestra en la siguiente imagen retomada de Redmon(2011): 

<p align="center">
    <img src="/project/sketches/ray1.png" width="500" />
</p>
Sin embargo, este enfoque aunque correcto no es muy práctico, esto debido a la cantidad de rayos de luz o fotones que se encuentran rondado en una imagen o en el mundo real, ademas solo son necesarios para la computación gráfica los rayos que llegan al punto focal, por lo que se cambia el enfoque. Para el ray tracing se parte del punto focal que hace pasar los rayos de luz por cada uno de los puntos del plano de proyección se renderiza la imagen a partir de algunas propiedades que se dan al impactar el rayo contra los objetos que se encuentran en la imagen, entonces el algoritmo se basa en encontrar el punto de intersección más cercano del rayo con el objeto de la imagen y renderizar en el plano de proyección alguna imagen de acuerdo con la distancia de la intersección al punto focal, en donde además se pueden tener en cuenta otros factores como el color o la capacidad de absorber luz que tiene el objeto sobre el cual impacta el rayo (Redmon, 2011). 
<p align="center">
    <img src="/project/sketches/ray2.png" width="500" />
</p>

## Resultados

Con el fin de demostrar el concepto se puede realizar el trazado de los rayos para renderizar una esfera, para esto es necesario primero determinar el sistema de referencia y con esto poder renderizar sobre el plano de proyección es decir determinar la relación entre el plano y los píxeles de la pantalla, además cuando el rayo impacte sobre el rayo es necesario saber que color sera el que se dibujara sobre le plano y por último colorear el pixel correspondiente, acontinuación se muestran los desarrollados realizados por Gambetta (2021). Para comenzar se realiza la relación entre rayos de luz y los píxeles: 

{{< katex display >}}
V_x = C_x \frac{V_w}{C_w}
{{< /katex >}}
{{< katex display >}}
V_y = C_y \frac{V_h}{C_h}
{{< /katex >}}
En donde C hace refenrencia al tamaño del plano que se esta usando y V es el tamaño de la pantalla real sobre la cual se proyectara la imagen. Con esta relación se puede determinar un pixel por cada una de los puntos en le plano sobre el cual se dibujara lo que es interceptado por los rayos.
El siguiente paso es disparar un rayo por cada uno de los puntos en el plano desde el punto focal, para esto se utiliza la ecuación paramétrica de la recta en tres dimensiones y además se parte de un punto O que será el origen o el punto focal y se dispara hacia cada uno de los puntos de V es decir del plano sobre el cual se dibujara. A continuación se mostrará la ecuación de la recta en donde se puede representar cualquier punto P y ademas t señala el recorrido del rayo :
{{< katex display >}}
P = \vec{O} + t(\vec{V} - \vec{O})
{{< /katex >}}
Como se renderizaran esferas, es necesario definir estas de forma matemática, por lo que se parte de que las esferas tiene un centro y un radio y al tener se puede definir que la relación que existe entre el punto del plano de proyección y el centro de la esfera, al juntar esta ecuación con la del rayo y al reemplazar V - O por el vector D, es decir la dirección del vector, se obtiene la siguiente ecuación en donde el simbolo <> representa el producto punto:
{{< katex display >}}
<\vec{O} + t \vec{D} - \vec{C} , \vec{O} + t \vec{D} - \vec{C} > = r^2
{{< /katex >}}
Al desarrollar estas ecuaciones es posible llegar a que la distancia entre los puntos y el punto focal se puede resolver mediante ecuaciones cuadráticas como se ilustra en la siguiente figura: 
<p align="center">
    <img src="/project/sketches/ray3.png" width="300" />
</p>

Con la finalidad de realizar un renderizado correcto de la luz también es necesario tener en cuenta la luz ambiental o la luz especular que llega a un punto P dado, para lo cual cada uno de los puntos requieren de un vector normal N, este sera necesario para computar a intensidad de la luz en cada uno de los puntos: 
{{< katex display >}}
I_P = I_A + \sum_{i=1}^n I_i \frac{< \vec{N}, \vec{L_i}>}{| \vec{N}| | \vec{L_i}|}
{{< /katex >}}
Ademas es necesarip definir que la esfera sobre la cual se refleja la luz tiene un vector normal para cada uno de los puntos, y este se puede hallar con el punto donde se quiere hallar la normal y el centro de la esfera:
{{< katex display >}}
\vec{N} = \frac{P-C}{|P-C|}
{{< /katex >}}

Con todos estos elementos es posible presentar el resultado final en el cual se renderizan algunas esferas a las cuales la luz les llega desde un punto en la parte derecha de la pantalla:


{{< p5-iframe sketch="/project/sketches/rayTracingtest.js"  width="620" height="625" >}}

{{< p5-iframe sketch="/project/sketches/rayTracingtestMultiple.js"  width="620" height="625" >}}


## Conclusiones y trabajo futuro
Se puede apreciar que es posible obtener unos efectos bastante realistas de luz cuando se aplica esta técnica para el renderizado las imágenes, igualmente se observa como aumenta el costo computacional al realizar las operaciones de ray casting lo cual puede llegar a ser un problema grave teniendo en cuenta que no se ha llegado a usar todos los efectos posibles como lo son por ejemplo los efectos de reflección de la luz o el manejo de diferentes figuras geométricas con diferentes materiales que puedan absorber mejor o peor la luz. Para el trabajo futuro se presenta la posibilidad de ampliar el programa incluyendo los efectos anteriormente mencionados pero también otros aún más importantes como lo son las sombras.  

## Recursos


- Gambetta, Gabriel (2021). Computer Graphs from scratch. A programmer's introduction to 3D rendering. No starch Press. San Francisco
- Glassner, Andrew (2019). An Introduction to Ray Tracing. Academic Press, retomado de https://www.realtimerendering.com/raytracing/An-Introduction-to-Ray-Tracing-The-Morgan-Kaufmann-Series-in-Computer-Graphics-.pdf
- Redmon, Joe (2011). Ray Tracing. Trabajo de Tesís, Degree of Bachelor of Arts. Computer Science Department of Middlebury College, retomado de https://pjreddie.com/media/files/Redmon_Thesis.pdf




