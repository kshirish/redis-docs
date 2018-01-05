# redis-docs


## Getting Started

```sh
brew install redis 			# install on your system
redis-server				# start redis server instance
redis-cli					# start the command line

npm install redis
```


## Command line reference


### Strings


```sh
redis> GET nonexisting
(nil)
redis> SET mykey "Hello"
"OK"
redis> GET mykey
"Hello"


redis> STRLEN mykey
(integer) 11
redis> STRLEN nonexisting
(integer) 0


redis> SET key1 "Hello World"
"OK"
redis> SET mykey "This is a string"
"OK"


redis> GETRANGE mykey 0 3
"This"
redis> GETRANGE mykey 0 -1
"This is a string"


redis> SETRANGE key1 6 "Redis"
(integer) 11
redis> GET key1
"Hello Redis"


redis> SET mykey "10"
"OK"
redis> INCR mykey
(integer) 11
redis> GET mykey
"11"


redis> SET mykey "10"
"OK"
redis> INCRBY mykey 5
(integer) 15


redis> MSET key1 "Hello" key2 "World"
"OK"
redis> GET key1
"Hello"
redis> GET key2
"World"


redis> EXISTS mykey
(integer) 0
redis> APPEND mykey "Hello"
(integer) 5
redis> APPEND mykey " World"
(integer) 11
redis> GET mykey
"Hello World"
```


### Lists

```sh
redis> RPUSH mylist "hello"
(integer) 1
redis> RPUSH mylist "world"
(integer) 2
redis> LRANGE mylist 0 -1
1) "hello"
2) "world"


redis> LPUSH mylist "world"
(integer) 1
redis> LPUSH mylist "hello"
(integer) 2
redis> LRANGE mylist 0 -1
1) "hello"
2) "world"


redis> RPUSH mylist "one"
(integer) 1
redis> RPUSH mylist "two"
(integer) 2
redis> RPUSH mylist "three"
(integer) 3
redis> LRANGE mylist 0 -1
1) "one"
2) "two"
3) "three"
redis> RPOP mylist
"three"
redis> LRANGE mylist 0 -1
1) "one"
2) "two"
redis> LPOP mylist
"one"
redis> LRANGE mylist 0 -1
1) "two"


redis> LPUSH mylist "World"
(integer) 1
redis> LPUSH mylist "Hello"
(integer) 2
redis> LLEN mylist
(integer) 2


redis> LPUSH mylist "World"
(integer) 1
redis> LPUSH mylist "Hello"
(integer) 2
redis> LPUSH mylist "!"
(integer) 3
redis> LINDEX mylist 0
"!"
redis> LINDEX mylist -1
"World"
redis> LINDEX mylist 2
"World"
redis> LINDEX mylist -3
"!"


redis> RPUSH mylist "one"
(integer) 1
redis> RPUSH mylist "two"
(integer) 2
redis> RPUSH mylist "three"
(integer) 3
redis> LSET mylist 0 "four"
"OK"
redis> LSET mylist -2 "five"
"OK"
redis> LRANGE mylist 0 -1
1) "four"
2) "five"
3) "three"


redis> RPUSH mylist "Hello"
(integer) 1
redis> RPUSH mylist "World"
(integer) 2
redis> LINSERT mylist BEFORE "World" "There"
(integer) 3
redis> LRANGE mylist 0 -1
1) "Hello"
2) "There"
3) "World"
redis> LINSERT mylist AFTER "World" "There"
(integer) 4
redis> LRANGE mylist 0 -1
1) "Hello"
2) "There"
3) "World"
4) "There"
```


### Database


```sh
redis> SET key1 "Hello"
"OK"
redis> DEL key1
(integer) 2
redis> GET key1
(nil)


redis> SET mykey "Hello"
"OK"
redis> EXPIRE mykey 10
(integer) 1
redis> TTL mykey
(integer) 10
redis> SET mykey "Hello World"
"OK"
redis> TTL mykey
(integer) -1


redis> SET mykey "Hello"
"OK"
redis> EXPIRE mykey 10
(integer) 1
redis> TTL mykey
(integer) 10
redis> PERSIST mykey
(integer) 1
redis> TTL mykey
(integer) -1


redis> MSET firstname Jack lastname Stuntman age 35
"OK"
redis> KEYS *name*
1) "lastname"
2) "firstname"
redis> KEYS a??
1) "age"
redis> KEYS *
1) "age"
2) "lastname"
3) "firstname"


redis> SET mykey "Hello"
"OK"
redis> RENAME mykey myotherkey
"OK"
redis> GET myotherkey
"Hello"


redis> RPUSH numbers 0 6 39 18 -59
(integer) 5
redis> RPUSH numbers
1) "-59"
2) "0"
3) "6"
4) "18"
5) "39"
redis> SORT numbers DESC
1) "39"
2) "18"
3) "6"
4) "0"
5) "-59"
redis> RPUSH names foo bar doe
(integer) 3
redis> LRANGE names 0 -1
1) "foo"
2) "bar"
3) "doe"
redis> SORT names ALPHA
1) "bar"
2) "doe"
3) "foo"


redis> SET name harry
"OK"
redis> TYPE name
"string"
```