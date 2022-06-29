---
title: Parte II
---

# Entrega 3 - Parte II

### WebGL *Lighting* y *Material*

#### Lighting

La idea de la ecuación de iluminación es calcular el color de un punto en una superficie. Como parámetros recibe las propiedades del material de la superficie y las propiedades de la fuente de luz que ilumina la superficie. Así mismo, el ángulo en que incide la luz también resulta importante, pero este puede ser calculado a partir de la dirección en la que está la fuente de luz y del vector normal de la superficie. El ángulo del observador y el ángulo del haz de luz refractado también juegan un papel clave. [4]

![Vectores implicados en la ecuación de iluminación](/project/sketches/webgl_lighting.png)

Esta ecuación también tiene en cuenta los colores de ambiente y emisión, pero estos no dependen de los vectores de dirección mostrados en la anterior imagen. [4]

#### *Material*

Mediante esta propiedad es posible asignar características a las superficies con base en parámetros como el color, textura, transparencia y reflectividad, que a su vez se relacionan con otras propiedades de la iluminación como la reflexión ambiente, que determina el color de un material bajo iluminación ambiental, reflexión difusa, que determina el color de un objeto bajo iluminación directa, o la reflexión especular, que determina el color de un objeto al reflejar fuentes de luz. [5]

#### *Phong shaders*

En algunos casos, cuando la fuente de luz está demasiado cerca a la primitiva (en comparación con el tamaño de la primitiva) los ángulos se vuelven demasiado pequeños, lo que causa que, debido a que la iluminación depende fuertemente de los ángulos, no se obtenga un buen resultado. Para mejorar los resultados los cálculos son trasladados de los *vertex shaders* a los *fragment shaders* por medio de variables *varying* en lo que se conoce como sombreado Phong, que consiste en interpolar vectores normales para calcular la iluminación de cada píxel. [4]

#### *Diffuse*

Es una luz que choca contra un objeto y se refracta en todas las direcciones. La cantidad de luz está determinada por el ángulo entre el haz de luz y el vector normal de la superficie. [6]

Para realizar los cálculos, cada vértice que define un triángulo debe tener asociado un vector normal, los cuales se usan para aplicar la ley del coseno de Lambert. Los efectos de difusión se pueden observar (acá)[http://learnwebgl.brown37.net/09_lights/light_position/light_position.html]. [6]

![Cálculo de la difusión de la luz](/project/sketches/webgl_diffuse_light.png)

#### *Spotlights*

Son fuentes de luz que no emiten luz en todas las direcciones sino en un cono. Es posible encontrarlas en *three.js*, pero estaban disponibles en *OpenGL* desde la versión 1.1. El vértice del cono se ubica en la posición de la luz y el cono apunta en alguna dirección, llamada la dirección del punto (*Spot direction*). Esta dirección se especifica como un vector. El tamaño del cono se especifica por un ángulo de corte (*cutoff angle*) y la luz de este solo es emitida en las direcciones en las cuales la dirección del punto es menor al ángulo de corte. Allí, la intensidad del haz de luz puede reducirse a medida que aumenta el ángulo entre el haz y la dirección de punto. [4] El comportamiento de este tipo de fuente de luz puede ser observado [acá](https://math.hws.edu/eck/cs424/graphicsbook2018/demos/c7/spotlight-demo.html).

**Las referencias fueron colocadas acá por comodidad, pero aún falta la tercera parte del reporte.**

## Referencias

[1] Wikipedia contributors. (2022c, junio 24). Interpolation. Wikipedia. Recuperado 25 de junio de 2022, de https://en.wikipedia.org/wiki/Interpolation

[2] Wikipedia contributors. (2022a, abril 22). Texture mapping. Wikipedia. Recuperado 25 de junio de 2022, de https://en.wikipedia.org/wiki/Texture_mapping

[3] Wikipedia contributors. (2022b, junio 2). HSL and HSV. Wikipedia. Recuperado 25 de junio de 2022, de https://en.wikipedia.org/wiki/HSL_and_HSV#HSV

[4] Libretexts. (2020, 7 julio). 7.2: Lighting and Material. Engineering LibreTexts. Recuperado 25 de junio de 2022, de https://eng.libretexts.org/Bookshelves/Computer_Science/Applied_Programming/Book%3A_Introduction_to_Computer_Graphics_(Eck)/07%3A_3D_Graphics_with_WebGL/7.02%3A_Lighting_and_Material

[5] WebGL Materials · Learn · Clara.io. (s. f.). WebGL Materials. Recuperado 25 de junio de 2022, de https://clara.io/learn/user-guide/lighting_shading/materials/material_types/webgl_materials

[6] 9.2 - Diffuse Lighting — LearnWebGL. (s. f.). Diffuse Lighting. Recuperado 25 de junio de 2022, de http://learnwebgl.brown37.net/09_lights/lights_diffuse.html
