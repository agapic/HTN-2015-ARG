import codecs
import collections

table = [{} for _ in range(8)]
rev_table = [collections.defaultdict(set) for _ in range(8)]

for byte in range(32, 128):
    for i in range(8):
        b = byte ^ 0x55
        result = (b + (b << i) + (b >> i)) % 256
        table[i][byte] = result
        rev_table[i][result].add(byte)

hsh = codecs.decode(b"84c355da8831b62075d2ad9133ce6512", 'hex')

length = hsh[15]

pi = bytearray()

for i, byte in enumerate(hsh[0:15]):
    comp = 
    if byte in rev_table[i % 8]:
        print('ok')
        pi.append(list(rev_table[i % 8][byte])[0])
    else:
        print('error')

def securehash(plaintext):
    hsh = bytearray(16)
    plaintext = plaintext.encode('ascii')
    hsh[15] = len(plaintext)
    for i, byte in enumerate(plaintext):
        hsh[i%15] ^= table[i%8][byte]
    return hsh
