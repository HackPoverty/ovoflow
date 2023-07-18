import { useState } from "react";

export const usePagination = (limit: number) => {
  const [offset, setOffset] = useState(0);
  const onPrevious = () => {
    setOffset((current) => Math.max(0, current - limit));
  };
  const onNext = () => {
    setOffset((current) => current + limit);
  };

  return {
    limit,
    offset,
    onPrevious,
    onNext,
  };
};
