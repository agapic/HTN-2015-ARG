If you're familiar with CTFs, you've probably seen something like this in one way or another.  When you take a peek at grant_access.c, it's clear that to grant access to Dwight Schrute, you need to get the admin function to run. Reading up on the documentation for the signal function, you discover this handy definition: **void (*signal(int sig, void (*func)(int)))(int) sets a function to handle signal i.e. a signal handler with signal number sig.** In addition, you discover that SIGFPE means *Erroneous arithmetic operation, such as zero divide or an operation resulting in overflow*.  You can't divide by zero because of the `!atoi(argv[2]` in the *if* statement.


Putting this together, you discover that in order to run the admin function, you need to divide two numbers that result in integer overflow. The max/min value of an integer is +/- 2147483647 (2^31 -1 ). As such, when you divide 2147483648 or -2147483648 by -1, the resulting value exceeds the max/min range, and you get integer overflow.


Once you get the admin function to run, you'll be running the program as Dwight Schrute rather than Frederick Kruger, since the permissions for the user are r-s