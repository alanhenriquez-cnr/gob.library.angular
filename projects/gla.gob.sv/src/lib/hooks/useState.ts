import { signal, WritableSignal } from '@angular/core';
import { useEffect } from './useEffect';



/**
 * Interface for the useState hook.
 */
export interface UseState<T> {
    get: () => T;
    set: (value: T) => void;
    hasContent: () => boolean;
    onChange?: (value: T) => void;
}



/**
 * Custom hook to manage state in Angular components.
 * 
 * @param initial Initial value for the state.
 * @returns An object with `get` to retrieve the current value, `set` to update the value,
 *          and an optional `onChange` callback that can be set to listen for changes.
 */
export function useState<T>(initial: T): UseState<T> {
    const state = signal(initial);
    let onChange: ((value: T) => void) | undefined;

    useEffect(() => {
        state.set( state() as T );
    }, [state]);

    const set = (value: T) => {
        state.set(value);
        if (onChange) onChange(value);
    };

    function hasContent<T>(value: T): boolean {
        if (value == null) return false;

        if (typeof value === 'string') return value.trim().length > 0;
        if (Array.isArray(value)) return value.length > 0;
        if (typeof value === 'object') return Object.keys(value).length > 0;

        return true;
    }

    return {
        get: state,
        set,
        hasContent: () => hasContent(state()),
        get onChange() { return onChange; },
        set onChange(fn: ((value: T) => void) | undefined) { onChange = fn; }
    };
} 