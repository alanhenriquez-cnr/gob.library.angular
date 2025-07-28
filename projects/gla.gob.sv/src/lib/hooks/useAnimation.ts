import { OnDestroy } from '@angular/core';

/**
 * Aplica animaciones escalonadas y personalizadas a los hijos de un contenedor.
 *
 * Permite animar múltiples tipos de nodos simultáneamente, asignar clases personalizadas durante la animación,
 * y controlar tanto el delay como la duración incremental de cada elemento.
 *
 * @param options Opciones de configuración:
 *   - parentSelector: Selector CSS del contenedor padre (obligatorio).
 *   - childSelector: Selector o array de selectores CSS de los hijos a animar (obligatorio).
 *   - animationName: Nombre de la animación CSS a aplicar (obligatorio).
 *   - baseDelay: Delay inicial en segundos para la animación (opcional, default 0).
 *   - delayStep: Incremento de delay entre cada hijo en segundos (opcional, default 0.1).
 *   - duration: Duración base de la animación en segundos (opcional, default 1).
 *   - durationStep: Incremento de duración entre cada hijo en segundos (opcional, default 0.1).
 *   - customClass: Clase CSS personalizada que se añade a cada hijo durante la animación y se elimina al finalizar (opcional).
 *
 * @returns Una función de limpieza que elimina las clases y listeners agregados. Se recomienda llamarla en ngOnDestroy.
 *
 * @example
 * // Animar todos los <p> y <h2> dentro de .contenedor con delays y duración escalonada
 * const cleanup = useAnimation({
 *   parentSelector: '.contenedor',
 *   childSelector: ['p', 'h2'],
 *   animationName: 'fade-in',
 *   baseDelay: 0.2,
 *   delayStep: 0.1,
 *   duration: 1.5,
 *   durationStep: 0.2,
 *   customClass: 'animando',
 * });
 * // ...
 * // En ngOnDestroy:
 * cleanup();
 */
export function useAnimation(options: {
    parentSelector: string;
    childSelector: string | string[];
    animationName: string;
    baseDelay?: number;
    delayStep?: number;
    duration?: number;
    durationStep?: number;
    customClass?: string;
}) {
    const {
        parentSelector,
        childSelector,
        animationName,
        baseDelay = 0,
        duration = 1,
        delayStep = 0.1,
        durationStep = 0.1,
        customClass,
    } = options;

    // Para limpiar listeners y clases
    let cleanupFns: Array<() => void> = [];


    let observerInitialized = false;

    // Ejecutar animación
    const runAnimation = () => {
        const parent = document.querySelector(parentSelector);
        if (!parent) return;
        const selectors = Array.isArray(childSelector)
            ? childSelector
            : [childSelector];
        let children: Element[] = [];
        selectors.forEach((sel) => {
            children.push(...Array.from(parent.querySelectorAll(sel)));
        });
        children.forEach((el, idx) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.animation = 'none';
            void htmlEl.offsetWidth;
            htmlEl.style.animationName = animationName;
            htmlEl.style.animationDuration = `${duration + idx * durationStep}s`;
            htmlEl.style.animationDelay = `${baseDelay + idx * delayStep}s`;
            htmlEl.style.animationFillMode = 'forwards';
            if (customClass) {
                htmlEl.classList.add(customClass);
                // Eliminar la clase cuando termine la animación
                const removeClass = () => {
                    htmlEl.classList.remove(customClass);
                    htmlEl.removeEventListener('animationend', removeClass);
                };
                htmlEl.addEventListener('animationend', removeClass);
                // Guardar función de limpieza
                cleanupFns.push(() => {
                    htmlEl.classList.remove(customClass);
                    htmlEl.removeEventListener('animationend', removeClass);
                });
            }
        });
    };

    // Ejecutar al montar
    setTimeout(runAnimation, 0);

    // Solo inicializar el observer una vez
    if (!observerInitialized) {
        observerInitialized = true;
        // Observar cambios en los <link rel="stylesheet">
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach((link) => {
            const observer = new MutationObserver(() => {
                setTimeout(runAnimation, 0);
            });
            observer.observe(link, { attributes: true, attributeFilter: ['href'] });
        });
    }

    // Retornar función de limpieza para usar en ngOnDestroy si se desea
    return () => {
        cleanupFns.forEach(fn => fn());
        cleanupFns = [];
    };
}
