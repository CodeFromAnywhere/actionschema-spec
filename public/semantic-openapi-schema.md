OpenAPI, AsyncAPI and others are doing a great job at specifying how API endoints are to be requested, and how to interpret the response. They also define security practices in the APIs. However, these implementation details of how HTTP Requests work aren't important to what a function does semantically.

This datastructure aims to create the simplest possible way to describe the functionality of any API. Both auth and the HTTP implementations are separate concerns that can be handled elsewhere based on the API Specification.

With this datastructure and the tooling around it, I am targeting all API-based frameworks and standards that want to do things with semantics of functionality rather than the implementation details such as auth and http.

Examples are my previous version of ActionSchema and the Arazzo specification, but there are probably lots more tools that could benefit for this simplified datastructure.

![](request-normalisation.drawio.svg)

![](openapi-semantic-context.drawio.svg)
