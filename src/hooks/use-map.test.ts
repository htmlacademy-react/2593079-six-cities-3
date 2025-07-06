import { renderHook } from '@testing-library/react';
import { Map } from 'leaflet';
import useMap from './use-map';
import { City } from '../components/map/map';

// Мокаем Leaflet
vi.mock('leaflet', () => ({
  Map: vi.fn().mockImplementation(() => ({
    setView: vi.fn(),
    addLayer: vi.fn()
  })),
  TileLayer: vi.fn()
}));

describe('useMap hook', () => {
  const mockCity: City = {
    name: 'Paris',
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 12
    }
  };

  const mockRef = {
    current: document.createElement('div')
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not initialize map if ref is null', () => {
    const nullRef = { current: null };
    const { result } = renderHook(() => useMap(nullRef, mockCity));

    expect(Map).not.toHaveBeenCalled();
    expect(result.current).toBeNull();
  });

  it('should not initialize map if city is null', () => {
    const { result } = renderHook(() => useMap(mockRef, null));

    expect(Map).not.toHaveBeenCalled();
    expect(result.current).toBeNull();
  });

  it('should not reinitialize map on rerender with same city', () => {
    const { rerender } = renderHook(
      ({ city }) => useMap(mockRef, city),
      { initialProps: { city: mockCity } }
    );

    rerender({ city: mockCity });

    expect(Map).toHaveBeenCalledTimes(1); // Проверяем что карта создалась только один раз
  });
});
