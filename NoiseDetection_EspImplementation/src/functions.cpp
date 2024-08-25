#include <Arduino.h>
#include "functions.h"

double distance = 0;
double duration = 0;
String Warning;
double getDistance(int trig, int echo)
{

    digitalWrite(trig, LOW);
    delayMicroseconds(2);
    digitalWrite(trig, HIGH);
    delayMicroseconds(10);
    digitalWrite(trig, LOW);
    duration = pulseIn(echo, HIGH);
    distance = duration * 0.034 / 2;
    return distance;
}

String Warn(int c, int led)
{
    Warning = " ";
    if (c == 0)
    {
        digitalWrite(led, HIGH);
        Warning = "First Warning!";
    }
    if (c == 1)
    {
        digitalWrite(led, HIGH);
        Warning = "Second Warning!";
    }
    if (c == 2)
    {
        digitalWrite(led, HIGH);
        Warning = "Third Warning!";
    }
    return Warning;
}

void turnLedOff(int led)
{
    digitalWrite(led, LOW);
}

void reset(int l1, int l2, int l3, int c)
{
    c = 0;
    turnLedOff(l1);
    turnLedOff(l2);
    turnLedOff(l3);
}