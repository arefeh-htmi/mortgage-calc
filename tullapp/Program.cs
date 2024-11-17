namespace TollFeeCalculator;

class Program
{
    static void Main(string[] args)
    {
        var car = new Vehicle(VehicleType.Car);
        var motorbike = new Vehicle(VehicleType.Motorbike);

        var calculator = new VehicleTollCalculator();
        var nr1 = calculator.Calculate(new List<DateTime>() { new DateTime(2013, 1, 1, 8, 0, 00) }, car);
        var nr5 = calculator.Calculate(new List<DateTime>() { }, car);
        var nr6 = calculator.Calculate(new List<DateTime>() { new DateTime(2024, 11, 17) }, car);
        var nr2 = calculator.Calculate(new List<DateTime>() { new DateTime(2013, 1, 8, 8, 0, 00) }, car);
        var nr3 = calculator.Calculate(
            new List<DateTime>()
            {
                new DateTime(2013, 1, 8, 8, 0, 00),
                new DateTime(2013, 1, 8, 8, 30, 00),
                new DateTime(2013, 1, 8, 8, 31, 00),
            },
            car
        );
        var nr7 = calculator.Calculate(
            new List<DateTime>()
            {
                new DateTime(2013, 1, 1, 8, 0, 00),// holiday => 0kr
                // an hour for following checkpoints, highest = 13kr (8:00 till 8:29 => 13kr , 8:30 till 4:29 => 8kr)
                new DateTime(2013, 1, 8, 8, 0, 00),
                new DateTime(2013, 1, 8, 8, 30, 00),
                new DateTime(2013, 1, 8, 8, 31, 00),
                // not an hour
                new DateTime(2013, 1, 9, 14, 00, 00), //=> 8kr
                new DateTime(2013, 1, 10, 16, 00, 00), //=> 18
            },
            car
        );

        var nr8 = calculator.Calculate(
            new List<DateTime>()
            {
                new DateTime(2013, 1, 9, 7, 00, 00), //=> 18
                new DateTime(2013, 1, 9, 8, 20, 00), //=> 13
                new DateTime(2013, 1, 9, 15, 00, 00), //=> 18
                new DateTime(2013, 1, 9, 16, 00, 00), //=> 18
                new DateTime(2013, 1, 9, 17, 00, 00), //=> 18
                new DateTime(2013, 1, 9, 18, 00, 00), //=> 18
            },
            car
        );

        var nr4 = calculator.Calculate(new List<DateTime>() { new DateTime(2013, 1, 6) }, motorbike);
        Console.WriteLine($"car with one date, holiday: expected: 0, actual: {nr1}");
        Console.WriteLine($"car with empty dates: expected: 0, actual: {nr5}");
        Console.WriteLine($"car with one non-holiday date: expected: 13, actual: {nr2}");
        Console.WriteLine($"car with one weekend date: expected: 0, actual: {nr6}");
        Console.WriteLine($"car with multiple dates, less than an hour for all points: expected: 13, actual: {nr3}");
        // The following case is why the Calculation logic was changed
        Console.WriteLine($"car with multiple dates, less than an hour for some points: expected: 39 actual: {nr7}");
        Console.WriteLine($"car with multiple dates, over 60: expected: 60 actual: {nr8}");
        Console.WriteLine($"motorbike: expected: 0, actual: {nr4}");

    }
}
