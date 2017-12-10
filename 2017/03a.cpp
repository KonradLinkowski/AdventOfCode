#include <iostream>

using namespace std;

int main()
{
    int n;
    cin >> n;
    int test = 0;
    int p = 1
    int jump = 2;
    int yes = 0;
    while (p < n)
    {
        p += jump;
        yes++;
        if (yes == 2)
        {
            jump++;
        }
        test++;
        if (test == 3)
        {
            test = 0;
        }
    }
    int roz = p - n;
    if (jump % 2 == 0)
    {

    }
    return 0;
}
