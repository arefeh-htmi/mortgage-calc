namespace TollFeeCalculator;

public enum VehicleType
{
    Car,
    Motorbike,
    Tractor,
    Emergency,
    Diplomat,
    Foreign,
    Military
}

/**
 * Having a separate Class for each of these without any specific attributes or methods for each Vehicle type would make the classes too small So I just have a general class here.
**/

public interface IVehicle
{
    public VehicleType GetVehicleType();
}

public record Vehicle : IVehicle
{
    private VehicleType Type { get; }

    public Vehicle(VehicleType type)
    {
        Type = type;
    }

    public VehicleType GetVehicleType() => Type;
}
