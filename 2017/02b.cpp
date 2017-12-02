#include <iostream>
#include <sstream>
#include <vector>
#include <fstream>

using namespace std;

int findDevisors(int index, vector<int> vec)
{
    double test;
    for (int i = 0; i < vec.size(); i++)
    {
        if (index == i || vec[index] < vec[i])
        {
            continue;
        }
        test = vec[index] / vec[i];
        if ((double) vec[index] / vec[i] == test)
        {
            return test;
        }
    }
    return 0;
}

int main()
{
    vector<int> arr;
    string s;
    long sum = 0;
    ifstream file("02.txt");
    int n;
    if (!file.is_open())
    {
        cout << "File not open";
        return -1;
    }
    if (!file.good())
    {
        cout << "File error";
        return -1;
    }
    while (!file.eof())
    {
        getline(file, s);
        cout << s << endl;
        stringstream is(s);
        while (is >> n)
        {
            arr.push_back(n);
        }
        for (int i = 0; i < arr.size(); i++)
        {
            int temp = findDevisors(i, arr);
            if (temp)
            {
                sum += temp;
                break;
            }
        }
        arr.clear();
        cout << sum << endl;
    }
    cout << sum << endl;
    return 0;
}
