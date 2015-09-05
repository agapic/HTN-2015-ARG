#include <stdio.h>
#include <string.h>

int main() {
  unsigned char hash[16];
  for (int i = 0; i < 16; i++) {
    hash[i] = 0;
  }
  char str[255];
  fgets(str, sizeof(str), stdin);
  strtok(str, "\n");

  unsigned char lens = strlen(str);
  hash[15] = lens;

  for (int i = 0; i < lens; i++) {
    unsigned char byte = str[i];
    byte ^= 0x55;
    byte += (byte >> (i % 8)) + (byte << (i % 8));
    hash[i % 15] ^= byte;
  }

  for (int i = 0; i < 16; i++) {
    printf("%02x", hash[i]);
  }
  printf("\n");
  return 0;
}
