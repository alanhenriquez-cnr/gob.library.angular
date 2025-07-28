import { computed, effect, Signal, WritableSignal } from '@angular/core';



type Reactif<T> = () => T;



/**
 * Hook personalizado que imita el comportamiento de `React.useEffect` en Angular.
 *
 * Ejecuta una función efecto (`effectFn`) cada vez que alguna de las dependencias reactivas cambia.
 * La función puede retornar opcionalmente una **función de limpieza**, que se ejecutará antes de cada nueva ejecución
 * o cuando el contexto donde se crea el efecto sea destruido.
 *
 * ⚠️ Importante: Las dependencias deben ser funciones getter `( ) => T` para garantizar su seguimiento reactivo.
 * Esto asegura que Angular detecte cambios y active el efecto correctamente.
 *
 * @param effectFn - Función que contiene la lógica efecto. Puede retornar una función de limpieza.
 * @param deps - Lista de **getter functions** que representan las dependencias reactivas.
 *
 * @example
 * // Uso básico en un componente:
 *
 * count = signal(0);
 *
 * constructor() {
 *   useEffect(() => {
 *     console.log('El valor de count ha cambiado:', this.count());
 *
 *     // Opcional: retorna una función de limpieza
 *     return () => {
 *       console.log('Limpiando después del efecto anterior');
 *     };
 *   }, [
 *     () => this.count(), // ✅ Getter reactivo
 *   ]);
 * }
 *
 * updateCount(): void {
 *   this.count.update(v => v + 1); // ✅ Actualiza la señal para disparar el efecto
 * }
 */
export function useEffect(
  effectFn: () => (() => void) | void,
  deps: Array<Reactif<any>>
): void {

    /**
     * Crea una señal computada que rastrea todas las dependencias pasadas.
     * Esto asegura que Angular detecte cambios y active el efecto.
     */
    const dependencyList = computed(() =>
        deps.map(dep => dep())
    );

    /**
     * Efecto reactivo que se ejecuta cuando alguna de las dependencias cambia.
     * Dentro del cuerpo del efecto, se lee `dependencyList()` para activar la reactividad.
     */
    effect(() => {
        // Acceder al valor de la señal computada activa la detección de cambios
        dependencyList();

        // Ejecutar la lógica definida por el usuario
        const cleanUp = effectFn();

        // Si se devuelve una función, esta se usa como limpieza
        if (typeof cleanUp === 'function') {
            return cleanUp;
        }

        return undefined;
    });
}