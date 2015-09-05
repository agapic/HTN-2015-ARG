Security "expert" Wesley is at it again. He knows enough not to store his key
in plaintext on these internal servers, so he stores it in plaintext instead
on an external server. Luckily for him the external server happens to be more
secure than the internal server... except that he programmed the way to access
the key. It uses his own home-cooked hash function, an executable called
"securehash", to check if the right passphrase is used. But this hash function
is worse than no hash function, because there is a preimage attack possible.

To get the key, one must decompile the securehash executable, understand how it
works, and apply a reverse operation to obtain a preimage.

## SecureHash

The javascript implementation of securehash is in splash/. This is needed
to check the key.

The steps of SecureHash are as follows:

 * Let HASH = 128-bit number, initially set to zero.
 * Encode the string to be hashed as UTF-8. (Alternatively, require an ASCII
   string.)
 * Let PLAINTEXT = the resulting byte array.
 * Set HASH = HASH & LENGTH(PLAINTEXT)
 * For each I=0:LENGTH(PLAINTEXT), BYTE=PLAINTEXT[I]:
   * Set BYTE = BYTE ^ 0b01010101
   * Set BYTE = BYTE + BYTE << (I % 8) + BYTE >> (I % 8)
   * Set HASH = HASH ^ BYTE << (I * 8 % 128)
