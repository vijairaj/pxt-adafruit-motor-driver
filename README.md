[![Build Status](https://travis-ci.org/vijairaj/pxt-adafruit-motor-driver.svg?branch=master)](https://travis-ci.org/vijairaj/pxt-adafruit-motor-driver)

# pxt-adafruit-motor-driver

Microbit Makecode block for [Adafruit Motor Driver Board](https://github.com/adafruit/Adafruit_Motor-Shield-v1).

## TODO

- [ ] Add a reference for your blocks here
- [ ] Add "icon.png" image (300x200) in the root folder
- [X] Add "- beta" to the GitHub project description if you are still iterating it.
- [X] Turn on your automated build on https://travis-ci.org
- [ ] Use "pxt bump" to create a tagged release on GitHub
- [ ] Get your package reviewed and approved https://makecode.microbit.org/packages/approval

Read more at https://makecode.microbit.org/packages/build-your-own

## Connections
| MDB PIN NAME       | MDB PIN NUMBER     | MICROBIT PIN NUMBER | MICROBIT PIN NAME   | COMMENT                      |
|--------------------|--------------------|---------------------|---------------------|------------------------------|
| Ground             |  GND1              | GND                 |                     |                              |
| Power              |  5V                | 3V                  |                     | Powered by micro:bit         |
| DIR_LATCH          |  D12               | P16                 | GPIO                |                              |
| DIR_SER            |  D08               | P15                 | SPI (MOSI)          |                              |
| -                  |  -                 | P14                 | SPI (MISO)          | Not connected                |
| DIR_CLK            |  D04               | P13                 | SPI (SCK)           |                              |
| DIR_EN             |  D07               | P08                 | GPIO                |                              |
| PWM2A              |  D11               | P00                 | PWM                 | Motor 1 speed                |
| PWM2B              |  D03               | P01                 | PWM                 | Motor 2 speed                |
| PWM0A              |  D06               | P02                 | PWM                 | Motor 3 speed                |
| PWM0B              |  D05               | -                   | -                   | Motor 4 - no speed control   |

* PWR Jumper removed
* 9V Battery connected per schematic
* DC motors connected per schematic
* MDB Logic section is powered by micro:bit

## Limitations
* Supports only DC motors, no support for stepper and servo motors
* Speed control available only for 3 motors, 4th motor has only direction control

## License
MIT License

## References
* [Adafruit Motor Driver Board Schematic](https://raw.githubusercontent.com/adafruit/Adafruit_Motor-Shield-v1/master/mshieldv12schem.png)
* [Adafruit Motor Shield Lecture - Part1](http://web.csulb.edu/~hill/ee444/Lectures/08%20Adafruit%20Part%201%20SPI.pdf)
* [Adafruit Motor Shield Lecture - Part2](http://web.csulb.edu/~hill/ee444/Lectures/09%20Adafruit%20Part%202%20Timer%20PWM.pdf)
* [Kitronik Motor Driver Block](https://github.com/KitronikLtd/pxt-kitronik-motor-driver)

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

