# Entrega 02

## Ray tracing


## Introducción
El ray tracing es una de las dos soluciones más populares dadas para el renderizado de objetos de tres dimensiones en pantallas de sólo dos. Esta técnica permite la creación de imágenes que se asemejan a la realidad de una forma relativamente sencilla. A continuación se muestra la historia de la técnica, la  teoría que se encuentra detrás y una aplicación que permite visualizar a rasgos generales como es el funcionamiento del ray tracing, es decir la realización de una prueba de concepto. De la revisión del marco teórico es posible concluir que esta técnica es cada vez más usada debido a los adelantos computacionales y las nuevas necesidades que surgen en la computación gráfica. 

## Contexto

### Historia
Con la finalidad de obtener en las pantallas objetos cada vez más parecidos a los que se encuentran en la realidad se comenzó a intentar producir los gráficos con conceptos de física, en donde era posible ver mediante los rayos de luz que llegaban al observador, este proceso en el cual se seguía un rayo de luz que salía de una fuente de luz hasta llegar al observador para formar una imagen fue llamado Ray Tracing. En el momento en el que se tuvo el concepto y la idea de realizar este tipo de procesado de las imágenes no era posible debido a su costo computacional (1960). Con el paso del tiempo se ha podido mejorar los algoritmos y además se tiene mayor capacidad de cómputo con lo cual se ha llegado al tratamiento de aspectos cada vez más complejos como lo son los reflejos, las sombras o el efecto que se produce en las imágenes en movimiento. 

### Funcionamiento

Como ya se había señalado anteriormente, el Ray Tracing se inspira en la física de la visión, por lo tanto se parte de un punto focal que vendría a ser el ojo del observador al cual llegan los rayos de luz, además se tiene un plano de proyección que es en el cual se verá la imagen, este es el que será emulado por la pantalla en donde se esté observando la imagen, este plano usualmente se subdivide en la cantidad de pixeles que tiene la pantalla. Si se parte de una fuente de luz esta rebota en los objetos y pasa directamente hacia el plano de proyección y después impacta contra el punto focal tal y como se muestra en la siguiente imagen: 

<p align="center">
    <img src="/project/sketches/ray1.png" width="500" />
</p>
Sin embargo, este enfoque aunque correcto no es muy práctico, esto debido a la cantidad de rayos de luz o fotones que se encuentran rondado en una imagen o en el mundo real, ademas solo son necesarios para la computación gráfica los rayos que llegan al punto focal, por lo que se cambia el enfoque. Para el ray tracing se parte del punto focal que hace pasar los rayos de luz por cada uno de los puntos del plano de proyección se renderiza la imagen a partir de algunas propiedades que se dan al impactar el rayo contra los objetos que se encuentran en la imagen, entonces el algoritmo se basa en encontrar el punto de intersección más cercano del rayo con el objeto de la imagen y renderizar en el plano de proyección alguna imagen de acuerdo con la distancia de la intersección al punto focal, en donde además se pueden tener en cuenta otros factores como el color o la capacidad de absorber luz que tiene el objeto sobre el cual impacta el rayo. 
<p align="center">
    <img src="/project/sketches/ray2.png" width="500" />
</p>






{{< p5-iframe sketch="/project/sketches/ray2d.js"  lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" >}}


