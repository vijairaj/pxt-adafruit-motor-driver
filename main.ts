/**
 * Blocks for driving the V1 legacy Adafruit Motor Driver Board
 */


//% weight=100 color=#224466 icon="\uf863" block="Motor Driver"
namespace adafruit_motor_driver {
    enum ShiftRegister {
        MOTOR1_A = 1 << 2,
        MOTOR1_B = 1 << 3,
        MOTOR2_A = 1 << 1,
        MOTOR2_B = 1 << 4,
        MOTOR3_A = 1 << 5,
        MOTOR3_B = 1 << 7,
        MOTOR4_A = 1 << 0,
        MOTOR4_B = 1 << 6,
    };

    interface MotorControl {
        motorA: ShiftRegister;
        motorB: ShiftRegister;
        pinPWM: number; // AnalogPin
    };

    let DIR_SER = DigitalPin.P15;
    let DIR_NC = DigitalPin.P14;
    let DIR_CLK = DigitalPin.P13;

    let DIR_EN = DigitalPin.P8;
    let DIR_LATCH = DigitalPin.P16;

    let motors: MotorControl[] = [
        {
            motorA: ShiftRegister.MOTOR1_A,
            motorB: ShiftRegister.MOTOR1_B,
            pinPWM: AnalogPin.P0
        },
        {
            motorA: ShiftRegister.MOTOR2_A,
            motorB: ShiftRegister.MOTOR2_B,
            pinPWM: AnalogPin.P1
        },
        {
            motorA: ShiftRegister.MOTOR3_A,
            motorB: ShiftRegister.MOTOR3_B,
            pinPWM: AnalogPin.P2
        },
        {
            motorA: ShiftRegister.MOTOR4_A,
            motorB: ShiftRegister.MOTOR4_B,
            pinPWM: -1
        }
    ];

    let latch: number = 0;
    let isMDBInitialized: boolean = false;


    function isValid(num: MotorNumber): boolean {
        return num >= MotorNumber.Motor1 && num <= MotorNumber.Motor4;
    }

    function getMotor(num: MotorNumber): MotorControl {
        if (!isValid(num)) return null;

        if (!isMDBInitialized) {
            isMDBInitialized = true;
            init();
        }

        return motors[num - 1];
    }

    function setLatch() {
        pins.digitalWritePin(DIR_LATCH, 0)
        pins.spiWrite(latch & 0xFF)
        pins.digitalWritePin(DIR_LATCH, 1)
    }

    function setDirection(motor: MotorControl, dir: MotorDirection) {
        if (dir == MotorDirection.Forward) {
            latch |= motor.motorA;
            latch &= ~(0xFF & motor.motorB);
        } else {
            latch &= ~(0xFF & motor.motorA);
            latch |= motor.motorB;
        }
        setLatch();
    }

    function setSpeed(motor: MotorControl, speed: number) {
        if (motor.pinPWM < 0) return; // speed control not available

        // first convert 0-100 to 0-1024 (approx)
        // We wont worry about the last 24 to make life simpler
        let OutputVal = Math.clamp(0, 100, speed) * 10;
        pins.analogWritePin(motor.pinPWM, speed);
    }

    function init() {
        pins.digitalWritePin(DIR_EN, 0)
        pins.digitalWritePin(DIR_LATCH, 1)
        pins.spiPins(DIR_SER, DIR_NC, DIR_CLK)
        pins.spiFormat(8, 3)
    }

    function cleanup() {
        pins.digitalWritePin(DIR_EN, 1)
    }






    /************************************************/
    /*         micro:bit motor driver blocks        */
    /************************************************/

    // Note that Forward and reverse are slightly arbitrary,
    // as it depends on how the motor is wired...
    export enum MotorDirection {
        //% block="forward"
        Forward,
        //% block="reverse"
        Reverse
    }

    export enum MotorNumber {
        //% blockId=adafruit_motordriver_motor_one
        //% block="motor 1"
        Motor1 = 1,
        //% blockId=adafruit_motordriver_motor_two
        //% block="motor 2"
        Motor2 = 2,
        //% blockId=adafruit_motordriver_motor_three
        //% block="motor 3"
        Motor3 = 3,
        //% blockId=adafruit_motordriver_motor_four
        //% block="motor 4"
        Motor4 = 4,
    }

    /**
     * Turns on motor specified by eMotorNumber in the direction specified
     * by eDirection, at the requested speed 
     *
     * @param motor which motor to turn on
     * @param dir   which direction to go
     * @param speed how fast to spin the motor
     */
    //% blockId=adafruit_motordriver_motor_on
    //% block="turn on %num|%dir|speed %speed"
    //% speed.min=0 speed.max=100 speed.defl=80
    export function motorOn(num: MotorNumber, dir: MotorDirection, speed: number): void {
        let motor = getMotor(num);
        if (motor == null) return;

        setDirection(motor, dir);
        setSpeed(motor, speed);
    }

    /**
     * Turns off the motor specified by eMotorNumber
     * @param motor :which motor to turn off
     */
    //% blockId=adafruit_motordriver_motor_off
    //% block="turn off %motor"
    export function motorOff(num: MotorNumber): void {
        let motor = getMotor(num);
        if (motor == null) return;

        latch &= ~(0xFF & motor.motorA);
        latch &= ~(0xFF & motor.motorB);
        setLatch();
    }
}

