import { useCallback, useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsPending(true);
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(req.statusText);
      }
      const data = await req.json();
      setData(data.results);
      setIsPending(false);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  }, [url]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isPending, error, fetchData };
}

export default useFetch;
