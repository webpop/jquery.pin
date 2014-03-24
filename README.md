## jQuery.pin

Ever wanted to **pin** something to the side of a text? Ever needed a subtle sticky element to quietly hang around as you scroll down?

**Jquery.Pin** is here to help! Pin any element to the top of a container. Easily **disable** it for smaller screen-sizes where there's no room for that kind of shenanigans.

## Usage

Include jquery and jquery pin at the bottom of your html. Then pin any element you want like this:

    $(".pinned").pin()

To make a pinned element stay within an outer container, use the containerSelector option. If you use a fixed header on your page and want the pin to be triggered as soon as your element hits it, use the fixedHeaderSelector option:

    $(".pinned").pin({
        containerSelector: ".container",
        fixedHeaderSelector: "header"
        })

That's it - go pin all the things!

## Examples

Plenty of examples [Here](http://webpop.github.com/jquery.pin/).

## License

Copyright (c) 2013, Mathias Biilmann
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
