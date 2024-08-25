#ifndef FUNCTIONS_H
#define FUNCTIONS_H
#include <Arduino.h>

void reset(int l1, int l2, int l3, int c);
double getDistance(int trig, int echo);
String Warn(int c, int led);
void turnLedOff(int led);

#endif
