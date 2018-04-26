/*
    W niektórych językach programowania istnieje operator "pipe", umożliwiający 
    łatwe łączenie wywołań funkcji (w JS na razie to tylko propozycja).
    Przykładowo odpowiednikiem takiego zapisu w JS: 
    
    const value = multiplyByFour(addTwo(2));

    Jest (w Elixirze):
    
    value = 2 
        |> addTwo 
        |> multiplyByFour
    
    W obu przypadkach wynikiem będzie 16.

    Stwórz mechanizm pozwalający na podobne, deklaratywne tworzenie łańcucha
    wywołań funkcji przeksztalcających pewną wartość. 
        1. Za operator "|>" niech posłuzy metoda o nazwie "chain". 
        2. Napisane testy zakładają taki oto interfejs (metoda "finally" jest opcjonalna, 
           jest ona odpowiednikiem .chain(handler).return()):

        interface Pipe<T> {
            static startingWith(value: T): Pipe<T>;
            chain<U>(handler: (value: T) => U): Pipe<U>;
            return(): T;
            finally<U>?(handler: (value: T) => U): U;
        }
*/

class Pipe {
    constructor(value) {
        this.value = value;
    }

    static startingWith(value) {
        return new Pipe(value);
    }

    chain(handler) {
        return new Pipe(handler(this.value))
    }

    return() {
        return this.value;
    }

    finally(handler) {
        return this.chain(handler).return();
    }
}

describe('problem5 - pipe', () => {
    it('returns a wrapped value (an object)', () => {
        expect(Pipe.startingWith(2)).toBeInstanceOf(Pipe);
    });

    describe('chain()', () => {
        it('returns a wrapped value', () => {
            expect(Pipe.startingWith(2).chain(v => v)).toBeInstanceOf(Pipe);
        });

        it('calls the handler with the actual value underneath the Pipe', () => {
            const fakeHandler1 = jest.fn(v => v + 2);
            const fakeHandler2 = jest.fn();

            Pipe.startingWith(2)
                .chain(fakeHandler1)
                .chain(fakeHandler2);

            expect(fakeHandler1).toHaveBeenCalledWith(2);
            expect(fakeHandler2).toHaveBeenCalledWith(4);
        });
    });

    describe('return()', () => {
        it('unwraps the value and returns it directly', () => {
            expect(
                Pipe.startingWith(2)
                    .chain(v => v + 5)
                    .chain(v => v % 3)
                    .chain(number => `The magic number is: ${number}`)
                    .return(),
            ).toBe('The magic number is: 1');
        });
    });

    if (Pipe.startingWith().finally) {
        describe('finally()', () => {
            it('unwraps the value and returns it directly', () => {
                expect(
                    Pipe.startingWith(2)
                        .chain(v => v + 5)
                        .chain(v => v % 3)
                        .finally(number => `The magic number is: ${number}`),
                ).toBe('The magic number is: 1');
            });

            it('calls the handler with the actual value underneath the Pipe', () => {
                const fakeHandler1 = jest.fn(v => v + 2);
                const fakeHandler2 = jest.fn();

                Pipe.startingWith(2)
                    .chain(fakeHandler1)
                    .finally(fakeHandler2);

                expect(fakeHandler1).toHaveBeenCalledWith(2);
                expect(fakeHandler2).toHaveBeenCalledWith(4);
            });
        });
    }
});
