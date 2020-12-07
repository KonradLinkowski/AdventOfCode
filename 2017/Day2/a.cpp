#include <iostream>
#include <sstream>
#include <vector>
#include <fstream>
#include <algorithm>

using namespace std;

int findMin(vector<int> vec)
{
    int min = vec[0];
    for (int i = 1; i < vec.size(); i++)
    {
        if (min > vec[i])
        {
            min = vec[i];
        }
    }
    cout << "min" << min -'0' << endl;
    return min - '0';
}

int findMax(vector<int> vec)
{
    int max = vec[0];
    for (int i = 1; i < vec.size(); i++)
    {
        if (max < vec[i])
        {
            max = vec[i];
        }
    }
    cout << "max" << max -'0' << endl;
    return max - '0';
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
        stringstream is(s);
        while (is >> n)
        {
            arr.push_back(n);
        }
        sum += findMax(arr) - findMin(arr);
        arr.clear();
    }
    cout << sum << endl;
    return 0;
}
