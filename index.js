import lookup from "./src/handlers/lookup"
import webhook from "./src/handlers/webhook"
const Router = require('./router')

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})


async function handleRequest(request) {
    const r = new Router()
    r.get("/lookup", lookup)
    r.get(".*/webhook", webhook)


    r.get('.*/bar', () => new Response('responding for /bar', { status: 200 }))

    let response = await r.route(request)

    if (!response) {
        response = new Response("Not found", { status: 404 })
    }

    return response
}
