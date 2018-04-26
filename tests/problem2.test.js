/*
    Napisz funkcję "compose", przyjmującą dowolną liczbę funkcji jako parametry i zwracającą
    nową funkcję.

    Wynikiem wywołania nowej funkcji z parametrem (param) jest (w przypadku przekazania wcześniej dwóch funkcji)
    rezultat wywołania drugiej funkcji wejściowej z wynikiem pierwszej funkcji wejściowej, do której przekazano param - kompozycja
    funkcji pierwszej i drugiej.

    Przykład:

    const greet = name => `Hello ${name}`;
    const shoutLoud = phrase => `${phrase.toUpperCase()}!!!!!!!!1111one`

    const greetButVeryLoud = compose(greet, shoutLoud);

    greetButVeryLoud('John') // HELLO JOHN!!!!!!!!1111one
*/

describe('problem2 - compose', () => {
    function stringToNumber(s) {
        return parseInt(s);
    }

    function numberToString(n) {
        return n.toString();
    }

    function wrap(value) {
        return { value };
    }

    function unWrap({ value }) {
        return value;
    }

    it('returns a function', () => {
        const func1 = pie => `Preparing ${pie}`;
        const func2 = fruit => `${fruit} pie!`;

        expect(typeof compose(func1, func2)).toBe('function');
    });

    describe('composed function', () => {
        it('calls both supplied functions', () => {
            const func1 = jest.fn();
            const func2 = jest.fn();

            const composed = compose(func1, func2);
            composed();

            expect(func1).toHaveBeenCalled();
            expect(func2).toHaveBeenCalled();
        });

        it('invokes the first function with passed parameter', () => {
            const func1 = jest.fn(fruit => `${fruit} pie!`);
            const func2 = jest.fn(pie => `Preparing ${pie}`);

            const composed = compose(func1, func2);
            composed('apple');

            expect(func1).toHaveBeenCalledWith('apple');
        });

        it('invokes the second function with result of the first function', () => {
            const func1 = jest.fn(fruit => `${fruit} pie!`);
            const func2 = jest.fn();

            const composed = compose(func1, func2);
            composed('apple');

            expect(func2).toHaveBeenCalledWith('apple pie!');
        });

        it('returns result of the second functions invocation', () => {
            const pieMaker = pie => `Preparing ${pie}`;
            const fruitPieProvider = fruit => `${fruit} pie!`;

            const fruitPieMaker = compose(fruitPieProvider, pieMaker);

            expect(fruitPieMaker('apple')).toBe('Preparing apple pie!');
        });

        it('works properly for 3 functions', () => {
            const composed = compose(
                stringToNumber,
                wrap,
                wrap,
            );

            const result = composed('5');

            expect(result).toEqual({ value: { value: 5 } });
        });

        it('works properly for 5 functions', () => {
            const composed = compose(
                stringToNumber,
                numberToString,
                wrap,
                unWrap,
                wrap,
            );

            const result = composed('5');

            expect(result).toEqual({ value: '5' });
        });

        it('works properly for 27 functions', () => {
            const composed = compose(
                stringToNumber,
                numberToString,
                stringToNumber,
                numberToString,
                stringToNumber,
                numberToString,
                stringToNumber,
                numberToString,
                stringToNumber,
                wrap,
                unWrap,
                wrap,
                wrap,
                unWrap,
                unWrap,
                wrap,
                wrap,
                wrap,
                unWrap,
                unWrap,
                unWrap,
                numberToString,
                stringToNumber,
                wrap,
                unWrap,
                wrap,
                wrap,
            );

            const result = composed('5');

            expect(result).toEqual({ value: { value: 5 } });
        });
    });
});
