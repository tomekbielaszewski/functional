# JS Kata - Functions and closures

## Jak odpalić testy

### Jeśli masz Node.js 7+ (najlepiej 8.6+)

Jeśli odpalasz je po raz pierwszy, zainstaluj zależności:

```
$ npm install
```

Następnie, aby puścić testy:

```bash
$ npm test
````

Jeśli wszystko poszło dobrze, powinieneś zobaczyć w konsoli, że wszystkie testy kończą się niepowodzeniem.

Aby puścić testy do pojedynczego zadania, możesz wykonać:

```bash
$ npm test -- problem1
```

Żeby nie wpisywać powyższej komendy co chwilę w konsoli, można posłużyć się tymi komendami:

```bash
$ npm run test:watch # dla wszystkich
$ npm run test:watch -- problem1 # dla pojedynczego
```
Wykonają one testy przy każdym zapisie pliku
### Jeśli masz Dockera (i `docker-compose`)

Wystartuj kontener za pomocą `docker-compose`:

```bash
$ docker-compose up -d
```

Następnie możesz wejść do kontenera za pomocą komendy:

```bash
$ docker-compose exec node sh
```

Teraz po wpisaniu komendy `ls` powinieneś zobaczyć pliki, które znajdują się w repo - np. folder `node_modules`.

Od teraz możesz posługiwać się konsolą tak, jakbyś miał zainstalowanego Node.js (patrz wyżej).

Po zakończeniu pracy puść następującą komendę, aby wyłączyć kontener:

```bash
$ docker-compose down
```
