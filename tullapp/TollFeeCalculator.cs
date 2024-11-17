
using tullapp;

namespace TollFeeCalculator;

public interface IVehicleTollCalculator
{
    double Calculate(List<DateTime> dateTimes, IVehicle vehicle);
}


public class VehicleTollCalculator
{
    private CarTollCalculator carTollCalculation;
    public VehicleTollCalculator()
    {
        carTollCalculation = new CarTollCalculator();
    }

    public double Calculate(List<DateTime> dates, IVehicle vehicle)
    {
        int tollFreeVehicleRate = 0;
        switch (vehicle.GetVehicleType())
        {
            case VehicleType.Car:
                return carTollCalculation.Calculate(dates);
            case VehicleType.Motorbike:
            case VehicleType.Tractor: 
            case VehicleType.Emergency: 
            case VehicleType.Diplomat: 
            case VehicleType.Foreign: 
            case VehicleType.Military: return tollFreeVehicleRate;
            default:
                throw new Exception("Invalid Type for vehicle");
        }
    }

}

