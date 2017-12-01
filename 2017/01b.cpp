#include <iostream>
using namespace std;

int main()
{
    string s;
    cin >> s;
    int sum = 0;
    int half = s.size() / 2;
    for (int i = 0; i < half; i++)
    {
        if (s[i] == s[i + half])
        {
            sum += s[i] - '0';
        }
    }
    cout << sum * 2 << endl;
    return 0;
}
