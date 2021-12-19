import { useCallback, useState } from "react";

type UndoState<T> = {
    undo: T[],
    current: T,
    redo: T[]
}

export const useUndo = <T>(initial: T) => {
    const initialState: UndoState<T> = {
        undo: [],
        current: initial,
        redo: []
    }

    const [state, setState] = useState(initialState);
    const canUndo = (state.undo.length > 0);
    const canRedo = (state.redo.length > 0);
    const current = state.current;

    const setValue = useCallback((value: T) => {
        setState( (curState) => {
            return {
                undo: [curState.current, ...curState.undo],
                current: value,
                redo: [...curState.redo]
            };
        });
    }, []);

    const undo = useCallback( () => {
        setState( (curState) => {
            if (!canUndo) {
                return curState;
            }

            return {
                undo: curState.undo.slice(1),
                current: curState.undo[0],
                redo: [curState.current, ...curState.redo]
            };
        });
    }, []);

    const redo = useCallback( () => {
        setState( (curState) => {
            if (!canRedo) {
                return curState;
            }

            return {
                undo: [curState.current, ...curState.undo],
                current: curState.redo[0],
                redo: curState.redo.slice(1)
            };
        });
    }, []);

    return {
        canUndo,
        canRedo,
        current,
        setValue,
        undo,
        redo
    };
}