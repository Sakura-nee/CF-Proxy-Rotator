async function ReqHandler(request) {
    if (!request.headers.get('originalUrl')) return new Response('Access Denied');
    const originalUrl = request.headers.get('originalUrl');
    const modifiedHeaders = new Headers(request.headers);
    modifiedHeaders.delete('originalUrl');

    const modifiedRequest = new Request(request, {
        headers: modifiedHeaders,
    });

    const response = await fetch(originalUrl, modifiedRequest);
    return response;
}

addEventListener('fetch', (event) => {
    event.respondWith(ReqHandler(event.request));
});
