interface IRepository {
    all(): [];
    delete(id: number): void;
    update(id: number): void;
}
