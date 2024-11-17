
namespace tullapp;

public static class LinqExtensions
{
    public static IEnumerable<IEnumerable<T>> GroupAdjacentBy<T>(
        this IEnumerable<T> source, Func<T, T, bool> groupByPredicate)
    {
        using (IEnumerator<T> enumerator = source.GetEnumerator())
        {
            if (!enumerator.MoveNext()) // empty collection
            {
                yield return Enumerable.Empty<T>();
            }
            var list = new List<T> { enumerator.Current };
            var previous = enumerator.Current;
            while (enumerator.MoveNext())
            {
                // If the condition by predicate applies, grouped together
                if (groupByPredicate(previous, enumerator.Current))
                {
                    list.Add(enumerator.Current);
                }
                else
                {
                    yield return list; // we are done grouping items in the group as soon as an adjacent element does not fulfill the condition in groupByPredicate
                    list = new List<T> { enumerator.Current };
                }
                previous = enumerator.Current;
            }
            yield return list;
        }
    }
}
