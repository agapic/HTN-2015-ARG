## Internal Node 4 Solutions

This was definitely one of the hardest parts of this challenge. It was hard in
a different way than Kate McDonald's node, Internal Node 2. Wesley's node did not
involve much investigation into vulnerability at all, in fact, as the vulnerability
was practically disclosed in Wes's handy README file. The difficult part of this
challenge was figuring out how to exploit it.

It's clear from the README that the solution is to find a preimage to the given
securehash digest. That is, the solution is to find some string that hashes to
the digest. With usual cryptographic hashes, this is a computationally
hard problem with no known solution much more efficient than brute force. With
securehash, however, this problem is known to be computationally trivial. In fact
I suspect that even a 255-character hash would be trivial to break&mdash;however
I have not personally devised an algorithm that could do that efficiently.

There is no access to the source code for securehash. If there was, then this
challenge would merely be some pen-and-paper planning and mostly a coding
challenge. A solution that works for passwords of length 16 to 30 (including
Wesley's password) is easy to code. One possible solution is just with a naive
table lookup, which is not very efficient, but much better than the brute force
solution (which is not practical in a reasonable amount of time).

However, the primary difficulty of the challenge was figuring out just how
securehash worked&mdash;one of our challengers compared it to cracking the Enigma
code! I designed the puzzle with two different solutions, which I believed to be
approximately equal in difficulty. The first solution involved experimentation:
using the binary as a black box, figure out the rules of the hash. It's relatively
straightforward to notice that the hash maps each character of the input to exactly
one byte of the output, and also increments the length byte (the last one) for
every character. However, the map is inconsistent across positions. Simply hashing
strings like <q>abbbbbbbbbb</q>, <q>babbbbbbbbb</q>, <q>bbabbbbbbbb</q>, and so
on helps one discover that the character map seems to be periodic every 8 characters...
but it takes some more experimentation, or just good intuition, to figure out that
the characters use the map based off the character's index mod 8, and map to the
hash's byte based off the character's index mod 15. Multiple characters mapping to
the same byte of the hash are handled by xor. At this point it suffices simply
to write a script to compute the entire table for securehash.

The alternative solution was to decompile or disassemble the binary&mdash;reverse
engineering. This solution may seem to be more efficient, but reverse engineering
binaries is not easy without prior experience. Using this solution illuminates
slightly on the 8 different character maps that can be noticed through experimentation&mdash;in
fact, these character maps are just a series of simple mathematical functions.
Each byte <code>x</code> at zero-based index <code>i</code> in the plaintext is
processed by: <code>(x ^ 0x55) + (x ^ 0x55) << (i % 8) + (x ^ 0x55) >> (i % 8)<code>,
casted to a single byte by truncating all higher bits. This realization may allow
for more efficient preimaging implementations&mdash;I have not tried&mdash;but
the naive approach of building the reverse table is more than sufficient for short
hashes of less than 31 characters.

In the end, simply follow the instructions on the README to claim your key.
(By the way, never take security advice from Wesley. If Wesley had used a mainstream
hash function like SHA-2, this challenge would have been unsolvable except by
exaustive brute force! Never choose obscurity over security.)

As is usual, we could not possibly anticipate every single solution, so if you
had a different approach, please do tell!
