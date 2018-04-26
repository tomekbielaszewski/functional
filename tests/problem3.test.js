/*

    Napisz funkcję "curry", która przyjmuje funkcję (funcIn) wymagającą wielu parametrów 
    i zwraca nową funkcję (funcOut). 
    
    Zwrócona funkcja działa identycznie jak funcIn, ale umożliwia przekazywanie parametrów
    pojedynczo, jeden za drugim. funcOut powinna zatem:
        - przyjmować tylko jeden paramter,
        - zwracać nową funkcję, o takim zamym zachowaniu, jeśli suma przekazanych do tej pory argumentów
          jest mniejsza niż liczba wymaganych argumentów (arność, ang. arity) funcIn
        - zwracać wartość taką samą jak funcIn po przekazaniu ilości parametrów równej arności funcIn

    Przykład:

        const func = (a, b, c, d) => a + b + c + d;
        const curriedFunc = curry(func);

        jest równoważne z:

        const curriedFunc = a => b => c => d => a + b + c + d;

        i skutkuje takim zachowaniem: 

        curriedFunc(1)          // zwraca funkcję
        curriedFunc(1)(2)       // zwraca funkcję
        curriedFunc(1)(2)(3)    // zwraca funkcję
        curriedFunc(1)(2)(3)(4) // zwraca 10
*/

function curry(func) {
    let length = func.length;
    if (length === 0) return func;
    return function (arg) {
        if (func.length === 1) return func(arg);
        return curry(func.bind(null, arg));
    }
}

describe('problem3 - curry', () => {
    it("returns the same func if it doesn't require any parameters", () => {
        const func = () => 'apple';

        expect(curry(func)).toBe(func);
    });

    it('returns a new function if with arity === 1 if the original one required any parameters', () => {
        const func = (a, b, c, d) => a + b + c + d;

        const curriedFunc = curry(func);

        expect(curriedFunc.length).toBe(1);
    });

    it('returns a new function if with arity === 1 when any parameter below original functions arity is passed', () => {
        const func = (a, b, c, d) => a + b + c + d;

        const curriedFunc = curry(func);

        expect(typeof curriedFunc(1)).toBe('function');
        expect(curriedFunc(1).length).toBe(1);
        expect(typeof curriedFunc(1)(2)).toBe('function');
        expect(curriedFunc(1)(2).length).toBe(1);
    });

    it("returns a result of func's invocation if all the params have been passed", () => {
        const func = (a, b, c) => a + b + c;

        const curriedFunc = curry(func);

        expect(curriedFunc(1)(2)(3)).toBe(6);
    });

    it('curried function ignores all the parameters, but the first', () => {
        const func = (a, b, c, d) => a + b + c + d;

        const curriedFunc = curry(func);

        expect(typeof curriedFunc(1, 2, 3)).toBe('function');
        expect(curriedFunc(1, 2, 3).length).toBe(1);
        expect(typeof curriedFunc(1)(2, 3, 4)).toBe('function');
        expect(curriedFunc(1)(2, 3, 4).length).toBe(1);
        expect(typeof curriedFunc(1)(2)(3, 4, 5)).toBe('function');
        expect(curriedFunc(1)(2)(3, 4, 5).length).toBe(1);
        expect(curriedFunc(1)(2)(3)(4, 5, 6)).toBe(10);
    });
});
