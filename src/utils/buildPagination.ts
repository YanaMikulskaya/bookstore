export const buildPagination = (currentPage: number, pageCount: number) => {
  let normalizedPage = +currentPage;

  if (isNaN(normalizedPage) || !isFinite(normalizedPage)) {
    normalizedPage = 1;
  }

  if (normalizedPage < 1) {
    normalizedPage = 1;
  }

  if (normalizedPage > pageCount) {
    normalizedPage = pageCount;
  }

  const prevPageNumber = normalizedPage - 1; // предполагаемая предыдущая страница, может получиться 0
  const nextPageNumber = normalizedPage + 1; // предполагаемая следующая страница, может получиться больше максимальной
  // TODO: type for scheme
  const scheme: (number | string)[] = [
    1,
    prevPageNumber,
    normalizedPage,
    nextPageNumber,
    pageCount,
  ]; // строим схему
  const filteredScheme = scheme.filter(
    (item) => +item > 0 && +item <= pageCount,
  ); // чистим те, которые меньше 0 или больше pagesCounter
  const set = new Set(filteredScheme); // удаляем дубли
  const result = Array.from(set); // обратно приводим к массиву
  if (result.length > 1) {
    if (+result[0] + 1 !== result[1]) result.splice(1, 0, '...'); // если между первым и вторым элементом пропуск, вставляем ...
    if (+(result.at(-2) ?? 0) + 1 !== (result.at(-1) ?? 0))
      result.splice(result.length - 1, 0, '...');
  } // если между последним и предпоследним пропуск, вставляем ...
  return result;
};

// 1 2 3 4 5 6 7 8 9 10 ... 100
// {1} 2 ... 100
// 1 {2} 3 ... 100
// 1 2 {3} 4 ... 100
// 1 ... 3 {4} 5 ... 100
// 1 ... 96 {97} 98 ... 100
// 1 ... 97 {98} 99 100
