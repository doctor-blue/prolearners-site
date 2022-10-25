export default interface DomainMapper<D, E> {
    toDomain(entity: E): D
    fromDomain(domain: D): E
}