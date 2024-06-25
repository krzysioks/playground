// Lesson 11
enum LoadingState {
    beforLoad = 'beforeLoad',
    loading = 'loading',
    loaded = 'loaded'
}

const isLoading = (state: LoadingState): boolean =>
    state === LoadingState.loading;

console.log(isLoading(LoadingState.beforLoad));

// literal types with function overloading to get different literal types definitions for the same function
function sendEvent2(eventName: 'addToCart', payload: { sku: string }): void;
function sendEvent2(eventName: 'pcheckout', payload: { count: number }): void;
function sendEvent2(eventName: string, payload: unknown): void {
    console.log(eventName, payload);
}

sendEvent2('addToCart', { sku: '325353' });
