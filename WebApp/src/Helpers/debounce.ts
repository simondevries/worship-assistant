
// Reference: https://stackoverflow.com/questions/52891199/debounce-and-react-window-resize-this-reference-issue
export function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        // @ts-ignore
        var context: any = this as any,
            args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}