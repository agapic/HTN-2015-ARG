import codecs
import collections

table = [{} for _ in range(8)]
rev_table = [collections.defaultdict(set) for _ in range(8)]
rev_table_2 = [collections.defaultdict(set) for _ in range(8)]

for byte in range(32, 128):
    for i in range(8):
        b = byte ^ 0x55
        result = (b + (b << i) + (b >> i)) % 256
        table[i][byte] = result
        rev_table[i][result].add(byte)

for i, tab in enumerate(rev_table):
    for byte in range(32, 128):
        for byte2 in range(32, 128):
            j = (i-1) % 8
            result = table[i][byte] ^ table[j][byte2]
            rev_table_2[i][result].add((byte, byte2))

hsh = codecs.decode(b"84c355da8831b62075d2ad9133ce6512", 'hex')

length = hsh[15]

pi = bytearray()
pi2 = bytearray()

for i, byte in enumerate(hsh[0:15]):
    comp = length // 15 + (1 if length % 15 > i else 0)
    if byte in rev_table[i % 8] and comp == 1:
        print('ok')
        pi.append(list(rev_table[i % 8][byte])[0])
    elif byte in rev_table_2[i % 8] and comp == 2:
        print('ok2')
        b1, b2 = list(rev_table_2[i % 8][byte])[0]
        pi.append(b1)
        pi2.append(b2)

def securehash(plaintext):
    hsh = bytearray(16)
    plaintext = plaintext.encode('ascii')
    hsh[15] = len(plaintext)
    for i, byte in enumerate(plaintext):
        hsh[i%15] ^= table[i%8][byte]
    return hsh
