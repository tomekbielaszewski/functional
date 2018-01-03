/*
    Napisz 'LazyPipe', mechanizm działający podobnie jak 'Pipe' z poprzedniego zadania,
    ale odsuwający w czasie wywołanie łańcucha funkcji aż do faktycznego zapytania o wynik, 
    czyli wywołania metody `return()`.

    Dodatkowo `LazyPipe` powinno umożliwiać kompozycję poprzez przekazanie do metody 'chain()'
    funkcji, które zwracają nie wartość, a również 'LazyPipe'.

    Napisane testy zakładają taki oto interfejs (zwróć uwagę na przeładowanie `chain`):
        interface LazyPipe<T> {
            static startingWith(value: T): LazyPipe<T>;
            chain<U>(handler: (value: T) => U): LazyPipe<U>;
            chain<U>(handler: (value: T) => LazyPipe<U>): LazyPipe<U>;
            return(): T;
        }
*/

describe('problem7 - LazyPipe', () => {
    it('returns a wrapped value (an object)', () => {
        expect(LazyPipe.startingWith(2)).toBeInstanceOf(LazyPipe);
    });

    describe('chain()', () => {
        it('returns a wrapped value', () => {
            expect(LazyPipe.startingWith(2).chain(v => v)).toBeInstanceOf(
                LazyPipe,
            );
        });

        it("doesn't do any work initially", () => {
            const fakeHandler1 = jest.fn(v => v + 2);
            const fakeHandler2 = jest.fn();

            LazyPipe.startingWith(2)
                .chain(fakeHandler1)
                .chain(fakeHandler2);

            expect(fakeHandler1).not.toHaveBeenCalled();
            expect(fakeHandler2).not.toHaveBeenCalled();
        });

        it("allows composition of LazyPipes and doesn't do anything initially in this case either", () => {
            const fakeInnerHandler1 = jest.fn(v => v);
            const fakeInnerHandler2 = jest.fn(v => v);
            const fakeHandler1 = jest.fn(v =>
                LazyPipe.startingWith(v)
                    .chain(fakeInnerHandler1)
                    .chain(fakeInnerHandler2),
            );
            const fakeHandler2 = jest.fn(v => v + 2);

            LazyPipe.startingWith(2)
                .chain(fakeHandler1)
                .chain(fakeHandler2);

            expect(fakeHandler1).not.toHaveBeenCalled();
            expect(fakeHandler2).not.toHaveBeenCalled();
            expect(fakeInnerHandler1).not.toHaveBeenCalled();
            expect(fakeInnerHandler2).not.toHaveBeenCalled();
        });

        it('results in a call to the handler with the actual value underneath the LazyPipe', () => {
            const fakeHandler1 = jest.fn(v => v + 2);
            const fakeHandler2 = jest.fn();

            LazyPipe.startingWith(2)
                .chain(fakeHandler1)
                .chain(fakeHandler2)
                .return();

            expect(fakeHandler1).toHaveBeenCalledWith(2);
            expect(fakeHandler2).toHaveBeenCalledWith(4);
        });

        it('unwraps the value, if a handler returns a LazyPipe itself', () => {
            const fakeHandler1 = jest.fn(v =>
                LazyPipe.startingWith(v)
                    .chain(v => v * 5)
                    .chain(v => 'Lazy boi says: ' + v),
            );
            const fakeHandler2 = jest.fn(v => v + 2);

            LazyPipe.startingWith(2)
                .chain(fakeHandler1)
                .chain(fakeHandler2)
                .return();

            expect(fakeHandler1).toHaveBeenCalledWith(2);
            expect(fakeHandler2).toHaveBeenCalledWith('Lazy boi says: 10');
        });
    });

    describe('return()', () => {
        it('unwraps the value and returns it directly', () => {
            expect(
                LazyPipe.startingWith(2)
                    .chain(v => v + 5)
                    .chain(v => v % 3)
                    .chain(number => `The magic number is: ${number}`)
                    .return(),
            ).toBe('The magic number is: 1');
        });
    }); 
});
