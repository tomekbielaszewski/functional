/*

    Używając zaimplementowanych wcześniej oraz dostępnych w tym module funkcji napisz kolejną, 
    która przekształci odpowiedź z serwisu w dane odpowiednie do wyświetlenia na wykresie.

    Dane zwracane przez serwis to tablica obiektów o formacie: 

    {
        date: string, // ISO8601
        count: number,
    }

    I mają być przekształocne do postaci: 
    
    {
        labels: string[],
        data: number[],
    }

    gdzie labelami mają być godziny w formacie np. 14:20, a wartościami odpowiednie wartości pola count.
    
    Interesują nas odczyty z dokładnością co do minuty, natomiast otrzymane dane były odczytywane częściej,
    wobec czego potrzebna jest ostatnia wartość z danej minuty. Dodatkowo urządzenie pomiarowe nie zawsze 
    jest poprawnie skalibrowane i zwraca wyniki ujemne - wiemy, że są one błędnie przesunięte (na szczęście 
    wszystkie jednakowo) i musimy dane znormalizować.

*/

const moment = require('moment');
const toPairs = require('lodash.topairs');

const formatISODates = format => data =>
    data.map(entry => ({
        ...entry,
        date: moment(entry.date).format(format),
    }));

const normalizeData = data => {
    const min = Math.min(...data.map(entry => entry.count));
    const offset = min < 0 ? Math.abs(min) : 0;

    return data.map(entry => ({ ...entry, count: entry.count + offset }));
};

const filterFullMinutes = data =>
    data.reduce(
        (hours, entry) => ({ ...hours, [entry.date]: entry.count }),
        {},
    );

const createDataset = hours =>
    toPairs(hours).reduce(
        ({ labels, data }, [hour, count]) => ({
            labels: [...labels, hour],
            data: [...data, count],
        }),
        { labels: [], data: [] },
    );

// Twoja implementacja poniżej
const formatEntries = data => data;

describe('problem4 - formatEntries', () => {
    it('formats entries correctly', () => {
        const fakeData = [
            { date: '2018-04-25T20:18:01.594Z', count: -30 },
            { date: '2018-04-25T20:18:02.594Z', count: -32 },
            { date: '2018-04-25T20:18:03.624Z', count: -31 },
            { date: '2018-04-25T20:19:01.594Z', count: -45 },
            { date: '2018-04-25T20:19:04.594Z', count: -40 },
            { date: '2018-04-25T20:21:04.594Z', count: -23 },
            { date: '2018-04-25T20:32:04.594Z', count: 2 },
            { date: '2018-04-25T20:32:04.700Z', count: 3 },
            { date: '2018-04-25T20:45:04.594Z', count: 15 },
            { date: '2018-04-25T20:47:04.594Z', count: 23 },
        ];
        const firstMoment = moment('2018-04-25T20:18:01.594Z');

        expect(formatEntries(fakeData)).toEqual({
            labels: [
                firstMoment.format('HH:mm'),
                firstMoment.add(1, 'minutes').format('HH:mm'),
                firstMoment.add(3, 'minutes').format('HH:mm'),
                firstMoment.add(14, 'minutes').format('HH:mm'),
                firstMoment.add(27, 'minutes').format('HH:mm'),
                firstMoment.add(29, 'minutes').format('HH:mm'),
            ],
            data: [14, 5, 22, 48, 60, 68],
        });
    });
});
