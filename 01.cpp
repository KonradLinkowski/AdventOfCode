#include <iostream>
using namespace std;

int main()
{
    string s;
    cin >> s;
    int sum = 0;
    if (s[0] == s[s.size() - 1])
    {
        sum += s[0] - '0';
    }
    for (int i = 0; i < s.size() - 1; i++)
    {
        if (s[i] == s[i + 1])
        {
            sum += s[i] - '0';
        }
    }
    cout << sum << endl;
    return 0;
}
