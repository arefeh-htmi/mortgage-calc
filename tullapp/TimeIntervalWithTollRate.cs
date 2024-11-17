namespace TollFeeCalculator;

// To avoid magic number
public enum TollRate
{
    Low = 8,
    Medium = 13,
    High = 18,
}

public record TimeIntervalWithTollRate(TimeOnly Start, TimeOnly End, TollRate Rate)
{
    public bool IsTimeWithinInterval(TimeOnly value) =>
        value.CompareTo(Start) >= 0 && value.CompareTo(End) <= 0;
}
