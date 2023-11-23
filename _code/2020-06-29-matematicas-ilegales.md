---
layout: post
title: Cuando las matemáticas son ilegales
description: La encriptación no es más que cuentas matemáticas. Cuentas con propiedades particulares, inventadas o descubiertas. Hay instituciones que luchan contra la encriptación, para nuestra seguridad. Qué significa esto?
date: 2020-06-29
tags: [encriptado, seguridad informatica, privacidad, tecnología]
image: dh.png
---

La encriptación no es más que cuentas matemáticas. Cuentas con propiedades particulares, inventadas o descubiertas, según quien pregunte. Son cuentas que permiten, entre otras cosas, mantener secretos y verificar datos. Funcionan siempre y siempre igual, y acompañaron la ceración y el crecimiento de internet.

Sin embargo, hay instituciones que luchan contra la encriptación, con la idea de "hay criminales que usan este sistema para llevar a cabo sus rufianerías".

Es cierto. La encriptación, el anonimato y la privacidad permiten sistemas irregulables: las criptomonedas, la deep web, o la mensajería privada. Ahora bien, nadie busca prohibir la encriptación en sí; en realidad buscan prohibir estos espacios irregulables que se generan.

¿Cómo? Proponiendo encriptación "rota": algorítmos que están abiertos por abajo para la legislación política, para que se puedan abrir cuando sea necesario, para nuestra seguridad.

Usamos mensajería instantánea todos los días y todo el día: Whatsapp, Discord, Zoom, Slack. ¿Qué tan privados son en realidad? Se dice que Signal es mucho más seguro porque tiene E2EE robusto por default, siempre, cosa que Zoom sólo habilitó el 28 de octubre de 2023, y WhatsApp implementa [con ciertas reservas](https://arstechnica.com/gadgets/2021/09/whatsapp-end-to-end-encrypted-messages-arent-that-private-after-all/).

¿Qué es el E2EE? ¿Cómo funciona? ¿Es una buena idea crear puertas traseras a nuestros algoritmos de encriptado?

## Ent-to-End-Encryption (E2EE)
Encriptación de extremo a extremo, es un método de asegurar secretos en una red insegura. Es algo así como inventar un idioma indecifrable con tu interlocutor, sin más que compartir un par de números.

En este artículo vamos a aprender una posible implementación del E2EE.

## XOR
Comencemos con lo básico. La operación *or exclusivo* (*xor*) es una operación booleana con la siguiente tabla de valor:

> ```
> xor | 0 1
> ----+-----
>  0  | 0 1
>  1  | 1 0
> ```

Es la operación más usada en criptografía. Hay un chiste que dice: "lo único que hacen los criptógrafos es operaciones *xor*". Y sorprendería qué tanto de eso es cierto: la gran mayoría de los protocolos de encriptación y hasheo que usamos (y hasta ignoramos usar), se reducen a no más que cadenas de *xor*. 

¿Por qué se usa tanto? Dos razones.

Aleatoriedad: cada bit tiene 50% de probabilidad de resultar en cualquier otro valor. Es decir, si te doy un 1, hay 50% probabilidad de que el resultado sea 1 o 0, y viceversa. Entonces, si usamos cualquier hilo de bits y lo operamos con un número pseudo-aleatorio (pseudo-random), producimos un resultado también pseudo-aleatorio.

Invertibilidad: es decir, puedo deshacer la operación. Veamos un ejemplo, si opero dos hilos  `m = 11011000` y  `k = 10100111`, me dá `m xor k = c = 01111111`. Ahora, si opero este resultado `c` por cualquiera de los productos, el resultado es el otro producto. Es decir, `m xor k = c; c xor k = m`.

## One Time Pad (OTP)

Y así llegamos a uno de los protocolos de encriptación más básico: [One Time Pad](https://en.wikipedia.org/wiki/One-time_pad) (OTP). Si queremos encriptar un mensaje (m), generamos una clave (k) del mismo largo que el mensaje, y los operamos con xor produciendo un *ciphertext* (c). A continuación pueden probarlo.

<div class="ui form">
    <div class="fields">
        <div class="six wide field">
            <input id="calc-otp-payload" type="text"
                placeholder="Message">
        </div>
        <button class="ui right labeled four wide field icon button"
            onclick="EncryptOTP()">
            <i class="key icon"></i>
            Encrypt
        </button>
        <div class="six wide field">
            <input id="calc-otp-key" type="number" placeholder="Key (numbers only)">
        </div>
    </div>
    <span id="calc-otp-error" style="color:red"></span>
</div>

Por las propiedades del *xor*, este protocolo de encriptado es muy seguro. ¿Qué tan seguro? Es lo más seguro que existe. Es el benchmark que usan todos los algorítmos para medir su seguridad.

Pero sólo si se usa bien. Por un lado, las claves han de ser del mismo tamaño que los mensajes. Además, hay que generar una clave nueva para cada mensaje (de ahí el nombre). El gran punto negativo de este algorítmo es su costo, y su fragilidad.

## Clave simétrica
OTP es un protocolo de clave simétrica, es decir, la misma clave se usa para encriptar y desencriptar.

Asumamos que tenemos una aplicación de mensajería, como puede ser Signal, hosteada en un servidor. Alice y Bob son amigos que quieren charlar, y van a usar nuestra app. Sabemos que el internet es un lugar inseguro, asique encriptamos los mensajes antes de enviarlos.

Una manera fácil de encriptar esos datos es con claves simétricas (como OTP) entre cada usuario y el servidor. En el momento de conexión inicial, Alice envía un número pseudo-random al servidor y así se establece una clave simétrica KAS (Key-Alice-Server). De nuevo . En un caso real, esta clave viajaría encriptada con una clave asimétrica. Ahora, cada vez que Alice quiera enviar un mensaje a Bob:
1. Alice encripta su mensaje con su clave KAS.
2. El ciphertext viaja por internet al servidor.
3. El servidor desencripta el mensaje con la clave KAS.
4. El servidor encripta el mensaje con la clave KBS.
5. El nuevo cipertext viaja por internet a Bob.
6. Bob desencripta el mensaje con la clave KBS.

Acá hay un ejemplo de este sistema. El caso empieza desde zero, asique deberán comenzar con el proceso de conexión inicial (crear y compartir KAS y KBS), luego pueden proceder a enviarse mensajes encriptados.

<div class="iframe-container">
    <iframe src="{{ site.url }}/assets/code/dh/non-dh.html" frameborder="0"></iframe>
</div>

Espero que hayan visto el problema de seguridad que tiene este sistema. 

¡El servidor lee todos nuestros los mensajes! Zero privacidad. Debemos confiar en un servidor y que la corporación no lean nuestros mensajes, no los vendan a un tercero y que no los hackeen. Estamos generando un gran *single point of failure*, punto único que fracaso, y con grandes corporaciones con información valiosa, la pregunta no es "si" serán hackeados o vendidos al gobierno, sino "cuando" y "cuántas veces".

## Diffie–Hellman
Por esto se crea el *End-to-end-encription* (E2EE) la encriptación de punta a punta: para que sólo Alice y Bob pueden leer sus mensajes, y el servidor (o cualquier intermediario) sólo pueda ver un ciphertext indecifrable. Pero, si el servidor por definición lee todo lo que le enviamos, ¿cómo puede Alice enviarle algo a Bob que el servidor mismo no pueda desencriptar?

Whitfield Diffie y Martin Hellman crearon uno de los primeros y más usados protocolos para compartir claves simétricas llamado [Diffie-Hellman](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange). 

Asumamos que Alice y Bob se comunican a traves de un medio inseguro (internet) y quieren compartir un secreto. Primero deben convenir unos números públicos: (p) = número primo muy grande, (G) = generador del cíclo Zp*. No explicaremos qué es ni cómo [se obtiene G](https://www.mtholyoke.edu/courses/mpeterso/math114/class16.html) porque tomaría todo otro artículo, basta con decir que `G < p`. Por lo general estos número son estándares: todo el mundo usa los mismos.

Para comunicarse, cada uno hace lo siguiente:
1. Alice y Bob escojen la parte privada de su clave. 
    * Alice un número random `(a)` tal que `(a) < p`.
    * Bob hace lo mismo: `(b) < p`.
2. Alice y Bob calculan sus claves públicas:
    * Alice calcula `(A) = G^a mod p`.
    * Bob calcula `(B) = G^b mod p`.
3. Alice y Bob envían al otro su número público.
    * Alice envía (A) a Bob.
    * Bob envía (B) a Alice.
4. Alice y Bob reciben el número público del otro, que usan para calcular el secreto compartido:
    * Alice usa el número de Bob para calcular `(K) = B^a (mod p)`.
    * Bob hace lo mismo, calcula `(K) = A^b (mod p)`.

¿Qué sucedió? Alice y Bob comparten ahora una clave `K = B^a = A^b:`

> `K = (G^a)^b = (G^b)^a = G^(ab) (mod p)`

¿Y el servidor? El servidor sólo vió las claves públicas (A) y (B). ¿Qué puede hacer con esto? Afortunadamente, no mucho. Lo más cerca que puede tal que podría calcular es algo como `K' = B*A` pero esto es muy distinto de ese secreto compartido que calcularon ellos solos:

> `B*A = (G^a) * (G^b) = G^(a+b) ≠ G^(ab) (mod p)`

No ha forma eficiente de calcular K con sólo A y B. Es más, porque p es primo y por las propiedades de G, calcular K es un [problema NP](https://es.wikipedia.org/wiki/Clases_de_complejidad_P_y_NP) llamado [problema del logarítmo discreto](https://es.wikipedia.org/wiki/Logaritmo_discreto).

Una vez que crearon su secreto compartido K, ahora cada usuario es responsable de encriptar y desencriptar los mensajes con este secreto simétrico, antes de enviarlos al servidor.

Aquí hay una implementación de exactamente esto, para experimentar. Cualquier duda, repasen los pasos que fuimos describiendo arriba.

Ejemplo para probar:
<div class="iframe-container">
    <iframe src="{{ site.url }}/assets/code/dh/dh.html" frameborder="0"></iframe>
</div>

En la vida real, se suele crear una clave simétrica K cada pocos minutos, ¡o incluso para cada mensaje! Aún así, esto no esconde la metadata, el emisor, el receptor, la hora, o el tamaño del mensaje. Hay maneras aún más complejas de esconder esto, que sobrepasan al concepto de E2EE.

## Puertas traseras
Una puerta trasera, conocida como "backdoor", es una manera de desencriptar un ciphertext sin necesidad del secreto K. Las backdoors a veces son encontradas por hackers, y a veces son creadas junto con el diseño original.

Hay muchas maneras de crear backdoors. Aquí un ejemplo para el protocolo [Diffie-Hellman](https://eprint.iacr.org/2016/644.pdf). Una idea es escoger un p y G con propiedades "especiales" llamados números *nothing-up-my-sleeve* (nada bajo mi manga). Un caso así famoso se dió en 1975, cuando la [NSA creó el estándar DES](https://en.wikipedia.org/wiki/Data_Encryption_Standard#NSA's_involvement_in_the_design), junto con una serie de números generadores arbitrarios, diciendo "ningún otro generador cumple con el estándar" sin dar explicaciones. Resultó ser que esos números eran suceptibles a un exploit que ellos conocían.

> La seguridad de un sistema es tan fuerte como su eslabón más débil.

Esta máxima de la seguridad informática es tan cierta como dura. Realmente podemos tener una casa con contraseña alfanumérica, lector de iris y huellas digitales, que si dejamos abierta la puerta de atrás, los ladrones entran igual. Crear una puerta trasera para un sistema, por negligencia o en nombre de alguna justicia arbitraria, crea a su vez este eslabón débil, explotable.

## Conclusión
En nombre de nuestra seguridad se nos reclama, de tanto en tanto, entregar nuestra privacidad y libertad. Y nosotros la cedemos porque confiamos que ellos actuarán en nuestro beneficio.

La verdad es que, aunque lo hagan hoy, nada asegura que no lo harán mañana, o que mañana no serán hakeados.

Las matemáticas son una tecnología realmente democrática, una verdadera justicia ciega, que no conoce lealtades ni intereses: nos habilita su uso a todos por igual. Habiendo creado un arma de astronómica independencia, ¿vamos a cederla por miedo e ignorancia?

---

> Este artículo fue publicado primero en https://filosofiadelfuturo.org/dh/
> Un par de recursos y recomendaciones:
>
> Un libro de los más ricos que existen sobre criptografía, aún está siendo completado pero se pueden ver versiones Beta: [A Graduate Course in Applied Cryptography, by Dan Boneh and Victor Shoup](http://toc.cryptobook.us/)
>
> Un libro con una muy buena introducción a todos los temas más matemáticos, empezando desde lo más básico de módulo y divisibilidad, y acaba construyendo los protocolos de SHA256, y temas más complejos [A computational introduction to Number Theory and Algebra, by Victor Shoup](https://shoup.net/ntb/ntb-v2.pdf)
>
> Internet está lleno de cursos online para aprender más sobre este tema, porque después de todo, la criptografía nació y creció con internet. Un curso muy bueno, diseñado y dirigido por Dan Boneh es [este curso online](https://www.coursera.org/learn/crypto). Si quieren meterse de lleno en este mundo, este es un buen lugar para empezar.


<script>
    function getByteArray(string) {
        string = string.toString();
        let bytes = [];
        for (let i = 0; i < string.length; i++)
            bytes.push(string.charCodeAt(i));

        return bytes;
    };
    function otp(string, key) {
        let byteString = getByteArray(string);
        const byteKey = getByteArray(key);

        if (byteString.length > byteKey.length)
            throw new Error("key too short!")

        byteString = byteString.map((value, index) =>
            value ^ byteKey[index]);

        return byteString.map(x => String.fromCharCode(x)).join("");
    };
    function EncryptOTP() {
        try {
            const key = document.getElementById("calc-otp-key")
            const message = document.getElementById("calc-otp-payload")
            const cipher = otp(message.value, key.value)
            message.value = cipher
            document.getElementById("calc-otp-error").innerHTML = "";
        } catch {
            document.getElementById("calc-otp-error").innerHTML = "Key too short!";
        }
    }
</script>