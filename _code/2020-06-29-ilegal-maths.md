---
layout: post
title: When Math is Ilegal
description: Encryption is essentially math with peculiar properties, invented or discovered. Hay instituciones que luchan contra la encriptación, para nuestra seguridad. Qué significa esto?
date: 2020-06-29
tags: [encriptado, seguridad informatica, privacidad, tecnología]
image: dh.png
---

Encryption is essentially math. Math, that is, with peculiar properties that allow, among other things, to keep secrets and guarantee veracity of data. It works always and always the same, and has accompanied the growth of the Internet.

However, there are institutions that fight against encryption with the idea that "there are criminals who use it to carry out their misdeeds".

Which is true. Encryption, anonymity and privacy allow for shady systems: cryptocurrencies, the deep web and private messaging. Granted, no one seeks to ban encryption per se; what some advocate is banning these irregular spaces.

How? By proposing "broken" encryption: algorithms with backdoors so political agents can open them when necessary, for our security.

We use instant messaging every day and all day: WhatsApp, Discord, Zoom, Slack. how private are they really? Signal is said to be much more secure because it has robust E2EE by default, something Zoom only enabled on October 28, 2023, and WhatsApp implements [with certain reservations](https://arstechnica.com/gadgets/2021/09/whatsapp-end-to-end-encrypted-messages-arent-that-private-after-all/).

What is E2EE? How does it work? Is it a good idea to create backdoors?

## Ent-to-End-Encryption (E2EE)
End-to-end encryption is a method of securing secrets in an insecure network. It is something like inventing an undecipherable language with your listener, just by sharing a couple of numbers.

In this article we are going to learn a possible implementation of E2EE. 

> The truth will set you free

## XOR
Let's start with the basics. The *exclusive or* (*xor*) operation is a boolean operation with the following value table:

> ```
> xor | 0 1
> ----+-----
>  0  | 0 1
>  1  | 1 0
> ```

It is the most used operation in cryptography. There's a running joke that says: "the only thing cryptographers do is *xor* operations". And you'd be surprised how much of that is true: the vast majority of encryption and hashing protocols we use boil down to no more than shuffled *xor*.

Why is it used so much? Two reasons.

Randomness: each bit has a 50% chance of resulting in any other value. That is, if I give you a 1, there is 50% probability that the result will be 1 or 0, and vice versa. So, if we use any string of bits and operate it with a trully random number, we produce a trully random result.

Invertibility: that is, we can easily undo the operation applying it twice. Let's see an example, if I operate two threads `m = 11011000` and `k = 10100111`, I get `m xor k = c = 01111111`. Now, if I operate this result `c` by any of the products, the result is the other product. That is, `m xor k = c` and `c xor k = m`.

## One Time Pad (OTP)

So we come to one of the most basic encryption protocols: [One Time Pad](https://en.wikipedia.org/wiki/One-time_pad) (OTP). If we want to encrypt a message (m), we generate a key (k) of the same length as the message, and operate with xor to produce a *ciphertext* (c). You can try it below.

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

Because of the properties of *xor*, this encryption protocol is very secure. How secure? It is as secure as security gets. It is the benchmark that all algorithms use to measure their security.

But only if the pad is used well. For one thing, the keys must be the same size as the messages. In addition, a new key must be generated for each message (hence the name of the algorithm). The big negative point of this algorithm is its cost, and its fragility.

## Symetric Key
OTP is a symmetric key protocol, that is, the same key is used for encryption and decryption.

Let's assume that we have a messaging application, such as Signal, hosted on a server. Alice and Bob are friends who want to chat, and they are going to use our app. We know that the Internet is an insecure place, so we encrypt the messages before sending them.

An easy way to encrypt that data is with symmetric keys (like OTP) between each user and the server. At the initial connection time, Alice sends a pseudo-random number to the server (we will call it Key-Alice-Server: KAS) establishing a symmetric Bob will do the same, establishing his own secret key (Key-Bob-Server: KBA). Now, every time Alice wants to send a message to Bob:

1. Alice encrypts her message with her KAS key.
2. The ciphertext travels over the Internet to the server.
3. The server decrypts the message with the KAS key.
4. The server encrypts the message with the KBS key.
5. The new cipertext travels over the Internet to Bob.
6. Bob decrypts the message with the KBS key.

Here is an example of this system. The case starts from zero, so you should start with the initial connection process (create and share KAS and KBS), then you can proceed to send encrypted messages to each other.

It's better to use the interface in a desktop PC.
<div class="iframe-container">
    <iframe src="{{ site.url }}/assets/code/dh/non-dh.html" frameborder="0"></iframe>
</div>

I hope you have seen the security problem with this system.

The server reads all our messages! Zero privacy. We must trust that the server and the corporation don't read our messages, don't sell them to a third party and are not hacked. We are creating a huge *single point of failure*, and with large corporations handling valuable information, the question is not "if" they will be hacked or sold to the government, but "when" and "how many times".

## Diffie–Hellman
This is why *End-to-end-encription* (E2EE) was created: so that only Alice and Bob can read their messages, and the server remains an intermediary who handles indecipherable ciphertexts. But, if the server, by definition, reads everything we send it, how can Alice send anything to Bob that the server itself cannot decrypt?

Whitfield Diffie and Martin Hellman created one of the first and most widely used symmetric key-sharing protocols called [Diffie-Hellman](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange). 

Let's assume that Alice and Bob communicate over an insecure medium (the Internet) and want to share a secret. First they must agree on some public numbers: (p) = a very large prime number, (G) = a generator of the cycle `Zp*`. We will not explain what it is and how [G](https://www.mtholyoke.edu/courses/mpeterso/math114/class16.html) is obtained because it would take a whole other article, suffice it to say that G is very special and `G < p`. In general these numbers are standard: everybody uses the same ones.

To communicate, each does the following:
1. Alice and Bob choose the private part of their key. 
    * Alice chooses a random number `(a)` such that `(a) < p`.
    * Bob does the same: `(b) < p`.
2. Alice and Bob compute their public keys:
    * Alice computes `(A) = G^a mod p`.
    * Bob computes `(B) = G^b mod p`.
3. Alice and Bob send each other their public number.
    * Alice sends `(A)` to Bob.
    * Bob sends `(B)` to Alice.
4. Alice and Bob receive each other's public number, which they use to calculate the shared secret:
    * Alice uses Bob's number to calculate `(K) = B^a (mod p)`.
    * Bob does the same, calculates `(K) = A^b (mod p)`.

What happened? Alice and Bob now share a key `K = B^a = A^b:`.

> `K = (G^a)^b = (G^b)^a = G^(ab) (mod p)`

What about the server? The server only saw the public keys `(A)` and `(B)`. What can it do with this? Fortunately, not much. The closest it can get is to somehtings like `K' = B*A` but this is very different from that shared secret they calculated on their own:

> `B*A = (G^a) * (G^b) = G^(a+b) ≠ G^(ab) (mod p)`

There is no efficient way to compute K with only A and B. Moreover, because p is prime and by the properties of G, computing K is a [NP problem](https://es.wikipedia.org/wiki/Clases_de_complejidad_P_y_NP) called [discrete logarithm problem](https://es.wikipedia.org/wiki/Logaritmo_discreto).

Once Alice and Bob have created their shared secret K, each user is now responsible for encrypting and decrypting messages with this symmetric secret, before sending them to the server.

Here is an implementation. If you have any doubts, go through the steps we described above. It's better to use the interface in a desktop PC.
<div class="iframe-container">
    <iframe src="{{ site.url }}/assets/code/dh/dh.html" frameborder="0"></iframe>
</div>

In real life, a symmetric K key is usually created every few minutes, or even for every message! Still, this does not hide metadata: sender, receiver, the timestamps or message size. There are more complex ways to hide these, which surpass the E2EE concept.

## Backdoors
A backdoor is a way to encode a broken link in an otherwise good algorithm, so that we can decrypt the ciphertext without the need for the secret key. Backdoors are sometimes found by hackers, and sometimes they are created along with the original design.

There are many ways to create backdoors. Examples exist even for [Diffie-Hellman] protocol (https://eprint.iacr.org/2016/644.pdf). One idea is to choose a `p` and `G` with "special" properties called *nothing-up-my-sleeve* numbers. One such famous case occurred in 1975, when the [NSA created the DES standard](https://en.wikipedia.org/wiki/Data_Encryption_Standard#NSA's_involvement_in_the_design), along with a set of arbitrary generator numbers, saying "no other generators meet the standard", without further comment. It turned out that those numbers were susceptible to an exploit that they knew about.

> Security of a system is as strong as its weakest link.

This maxim of security is as true as it is hard. We can have all the security we desire, a house with an iron door, blocked with an alphanumeric password, fingerprint and iris reader, that if we leave the back door open, burglars still get in. Creating backdoors to a system, through negligence or in the name of some arbitrary justice, creates weak exploitable links.

## Conclusion
In the name of our security we are called upon, from time to time, to surrender our privacy and freedom. And we give it up because we are affraid and trust that they will act in our benefit.

The truth is that, even if they do act in our benefit today, nothing assures that they won't do it tomorrow, or that tomorrow they won't be hacked.

Mathematics is a truly democratic technology, a blind justice, she knows no loyalties or interests, the great equalizer. Having created a weapon of astronomical independence, are we going to give it up out of fear and ignorance?

---

> This article was first published in Spanish in https://filosofiadelfuturo.org/dh/
>
> A couple of resources and recommendations:
>
> One of the richest books available on cryptography: [A Graduate Course in Applied Cryptography, by Dan Boneh and Victor Shoup](http://toc.cryptobook.us/)
>
> A book with a very good introduction to all the more mathematical topics, starting from the basics of modulus and divisibility, and ending by building the SHA256 protocols, and more complex topics [A computational introduction to Number Theory and Algebra, by Victor Shoup](https://shoup.net/ntb/ntb-v2.pdf)
>
> Internet is full of online courses to learn more about this topic, because after all, cryptography was born and grew up with the Internet. A very good course, designed and run by Dan Boneh is [this online course](https://www.coursera.org/learn/crypto). If you want to dive right in, this is a great place to start.

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