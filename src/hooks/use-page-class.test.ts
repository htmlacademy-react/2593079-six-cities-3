import { renderHook, act } from '@testing-library/react';
import { usePageClass } from './use-page-class';

describe('usePageClass hook', () => {
  it('should return initial state with empty string', () => {
    const { result } = renderHook(() => usePageClass());

    expect(result.current.pageClass).toBe('');
    expect(typeof result.current.setPageClass).toBe('function');
  });

  it('should update pageClass when setPageClass is called', () => {
    const { result } = renderHook(() => usePageClass());

    act(() => {
      result.current.setPageClass('new-class');
    });

    expect(result.current.pageClass).toBe('new-class');
  });

  it('should handle multiple updates', () => {
    const { result } = renderHook(() => usePageClass());

    act(() => {
      result.current.setPageClass('first-class');
    });
    expect(result.current.pageClass).toBe('first-class');

    act(() => {
      result.current.setPageClass('second-class');
    });
    expect(result.current.pageClass).toBe('second-class');

    act(() => {
      result.current.setPageClass('');
    });
    expect(result.current.pageClass).toBe('');
  });
});
