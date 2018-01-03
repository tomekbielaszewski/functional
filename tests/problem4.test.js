/*
    Napisz funkcję "memoize", która przyjmuje jako parametr funkcję i zwracającą nową funkcję,
    która zwraca to samo co przekazana w parametrze, ale cache'uje wyniki dla wcześniej przekazanych
    parametrów.

    Przykład:

    const addFiveTo = x => x + 5; 
    const memoized = memoize(addFiveTo);

    memoized(2); // 7, addFiveTo została wywołana
    memoized(5); // 10, addFiveTo została wywołana
    memoized(2); // 7, addFiveTo *nie* została wywołana, wynik z cache

*/

describe('problem4 - memoize', () => {
    it('returns a function', () => {
        expect(memoize(() => {})).toBeInstanceOf(Function);
    });

    describe('returned memoized function', () => {
        it('takes one argument (has arity === 1)', () => {
            expect(
                memoize((param1, param2) => param1 + param2).length,
            ).toBe(1);
        });

        it('passes through the value returned by the supplied function', () => {
            const someFunc = number => [number, number + 1, number + 2];

            const memoized = memoize(someFunc);

            expect(memoized(1)).toEqual([1, 2, 3]);
            expect(memoized(2)).toEqual([2, 3, 4]);
            expect(memoized(3)).toEqual([3, 4, 5]);
        });

        it("calls the supplied function for every parameter that haven't occured yet", () => {
            const fakeFunc = jest.fn();

            const memoized = memoize(fakeFunc);
            memoized('a');
            memoized('b');
            memoized('c');

            expect(fakeFunc).toHaveBeenCalledTimes(3);
        });

        it("doesn't call the supplied function if previously encountered parameter have been passed (returns from cache)", () => {
            const fakeFunc = jest.fn();

            const memoized = memoize(fakeFunc);
            memoized('a');
            memoized('a');
            memoized('a');

            expect(fakeFunc).toHaveBeenCalledTimes(1);
        });

        it('takes any value as a parameter', () => {
            const someFunc = value => JSON.stringify(value);

            const memoized = memoize(someFunc);

            expect(memoized({ a: 1 })).toEqual(someFunc({ a: 1 }));
            expect(memoized([1, 'b', true])).toEqual(
                someFunc([1, 'b', true]),
            );
            expect(memoized(() => 'Hello')).toEqual(
                someFunc(() => 'Hello'),
            );
        });

        it('memoizes value for params of every type (by reference)', () => {
            const fakeFunc = jest.fn();
            const object = { a: 1 };
            const array = [1, 'b', true];
            const func = () => 'Hello';

            const memoized = memoize(fakeFunc);
            memoized(object);
            memoized(object);
            memoized(array);
            memoized(array);
            memoized(func);
            memoized(func);

            expect(fakeFunc).toHaveBeenCalledTimes(3);
        });
    });
});