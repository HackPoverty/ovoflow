import { useEffect, useState } from "react";

export type Location = {
  latitude: number;
  longitude: number;
};

export const useGeolocation = () => {
  const [location, setLocation] = useState<Location | undefined>();
  const [error, setError] = useState<GeolocationPositionError | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const getLocation = () => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError(undefined);
      return;
    }

    setIsLoading(true);
    geo.getCurrentPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        setLocation({ latitude, longitude });
        setError(undefined);
        setIsLoading(false);
      },
      (error) => {
        setError(error);
        setIsLoading(false);
      },
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { location, error, isLoading, getLocation };
};

export type UseGeolocation = ReturnType<typeof useGeolocation>;
