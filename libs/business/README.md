# Business Package

This library implements the business rules for the application, following Clean Architecture principles.

Each directory under `src` is a module. Each module is divided in entity, repository and usecase layers.

The entity layer is responsible for describing the entity and it's validations. Anything that belongs to a single entity should be placed here.

The repository layer is responsible for describing and implementing interactions with databases.

The usecase layer is responsible for describing the business logic of the application. It is the only layer that can interact with the repository layer.
