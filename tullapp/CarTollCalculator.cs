using TollFeeCalculator;

namespace tullapp;
public interface IVehicleTypeTollCalculator
{
    double Calculate(List<DateTime> dateTimes);
}

public class CarTollCalculator : IVehicleTypeTollCalculator
{
    private ICollection<DateOnly> TaxFreeDaysOfYear = new List<DateOnly>()
    {
        new DateOnly(2013, 1, 1),
        new DateOnly(2013, 3, 28),
        new DateOnly(2013, 3, 29),
        new DateOnly(2013, 4, 1),
        new DateOnly(2013, 4, 30),
        new DateOnly(2013, 5, 1),
        new DateOnly(2013, 5, 8),
        new DateOnly(2013, 5, 9),
        new DateOnly(2013, 6, 5),
        new DateOnly(2013, 6, 6),
        new DateOnly(2013, 6, 21),
        new DateOnly(2013, 7, 1),
        new DateOnly(2013, 7, 2),
        new DateOnly(2013, 7, 3),
        new DateOnly(2013, 7, 4),
        new DateOnly(2013, 7, 5),
        new DateOnly(2013, 7, 6),
        new DateOnly(2013, 7, 7),
        new DateOnly(2013, 7, 8),
        new DateOnly(2013, 7, 9),
        new DateOnly(2013, 7, 10),
        new DateOnly(2013, 7, 11),
        new DateOnly(2013, 7, 12),
        new DateOnly(2013, 7, 13),
        new DateOnly(2013, 7, 14),
        new DateOnly(2013, 7, 15),
        new DateOnly(2013, 7, 16),
        new DateOnly(2013, 7, 17),
        new DateOnly(2013, 7, 18),
        new DateOnly(2013, 7, 19),
        new DateOnly(2013, 7, 20),
        new DateOnly(2013, 7, 21),
        new DateOnly(2013, 7, 22),
        new DateOnly(2013, 7, 23),
        new DateOnly(2013, 7, 24),
        new DateOnly(2013, 7, 25),
        new DateOnly(2013, 7, 26),
        new DateOnly(2013, 7, 27),
        new DateOnly(2013, 7, 28),
        new DateOnly(2013, 7, 29),
        new DateOnly(2013, 7, 30),
        new DateOnly(2013, 7, 31),
        new DateOnly(2013, 11, 1),
        new DateOnly(2013, 12, 24),
        new DateOnly(2013, 12, 25),
        new DateOnly(2013, 12, 26),
        new DateOnly(2013, 12, 31),
    };

    private ICollection<TimeIntervalWithTollRate> HourlyTollRate = new List<
        TimeIntervalWithTollRate
    >()
    {
        { new TimeIntervalWithTollRate(new TimeOnly(6, 0), new TimeOnly(6, 29), TollRate.Low  )},
        { new TimeIntervalWithTollRate(new TimeOnly(6, 30), new TimeOnly(6, 59), TollRate.Medium  )},
        {
            new TimeIntervalWithTollRate(new TimeOnly(7, 0), new TimeOnly(6, 59),
            TollRate.High )
        },
        { new TimeIntervalWithTollRate(new TimeOnly(8, 0), new TimeOnly(8, 29), TollRate.Medium  )},
        {
            new TimeIntervalWithTollRate(new TimeOnly(8, 30), new TimeOnly(14, 59),
            TollRate.Low )
        },
        { new TimeIntervalWithTollRate(new TimeOnly(15, 0), new TimeOnly(15, 29), TollRate.Medium  )},
        /**
        1- In the time spans ofthe first code(copied below), the result for 15:00 to 15:29 was already returned before comming to the next condition so in teh list I'm just starting the next span with 15:30
        2- || makes the result faulty, since the rate for all times that are basically more than 15:30 will be returned before checking other conditions rather than being between 15:30 - 16:59
        (hour == 15 && minute >= 0 && minute <= 29) ...
        (hour == 15 && minute >= 0 || hour == 16 && minute <= 59)....
         **/
        {
            new TimeIntervalWithTollRate(new TimeOnly(15, 30), new TimeOnly(16, 59),
            TollRate.High )
        },
        { new TimeIntervalWithTollRate(new TimeOnly(17, 0), new TimeOnly(17, 59), TollRate.Medium  )},
        {
            new TimeIntervalWithTollRate(new TimeOnly(18, 0), new TimeOnly(18, 29),
            TollRate.Low )
        },
    };

    public CarTollCalculator()
    {
    }

    public double Calculate(List<DateTime> dates)
    {
        if (dates.Count == 0) return 0;
        if (dates.Count == 1) return GetTollFee(dates[0]);

        //It's not specified if the dates are ordered in description so an ordering comes first
        var groupedDatesByHour = dates.Order().GroupAdjacentBy((x, y) =>
        {
            TimeSpan timeSpan = (y - x);
            var minutes = timeSpan.TotalMinutes; //The list is already sorted and y is larger than x so no need for getting absolute value
            return minutes < 60;
        });
        // Group by adjacent will put all the dates that are within less than an hour from each other in the same group; 
        // Then we just need to take the max toll rate value of each of these groups 

        var totalFee = groupedDatesByHour.Sum(x => GetTollFee(x.MaxBy(GetTollFee)));

        if (totalFee > 60) totalFee = 60;

        return totalFee;
    }

    private int GetTollFee(DateTime date)
    {
        if (IsTollFreeDate(date)) return 0;

        return GetHourRate(date);
    }

    private bool IsTollFreeDate(DateTime date)
    {
        if (date.DayOfWeek == DayOfWeek.Saturday || date.DayOfWeek == DayOfWeek.Sunday) return true;

        if (TaxFreeDaysOfYear.Any(x => x.Equals(DateOnly.FromDateTime(date))))
        {
            return true;
        }

        return false;
    }

    private int GetHourRate(DateTime date)
    {
        var hourlyRatePairs = HourlyTollRate.Where(x => x.IsTimeWithinInterval(TimeOnly.FromDateTime(date))).FirstOrDefault();

        if (hourlyRatePairs != null)
        {
            return (int)hourlyRatePairs.Rate;
        }
        return 0;
    }
}
