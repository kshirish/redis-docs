const redis = require('redis');
const client = redis.createClient();


// Connection
// ==========================

client.on('error', function(err) {
	console.log('Error occured: ', err);
})

client.on('connect', function() {
	console.log('connected!');
});

client.on('end', function() {
	console.log('Connection has ended!');
});


// GET/SET simple key/value pair
// ==========================

client.set('name', 'Bar');

client.set('father', 'Foo', function(err, result) {
	console.log(result);
});

client.get('father', function(err, result) {
	console.log(result);
});

client.get('name', function(err, result) {
	console.log(result);
});


// GET/SET object
// ==========================

client.hmset('info', {
	name: 'Bob',
	age: 32,
	city: 'NY'
});

client.hgetall('info', function(err, result) {
    console.log(result);
});


// GET/SET list
// ==========================

client.rpush(['countries', 'India', 'Bangladesh', 'Pakistan', 'Australia']);

client.lrange('countries', 0, -1, function(err, result) {
	console.log(result);
});

client.lpush(['colors', 'Red', 'Blue', 'Black', 'White']);

client.lrange('colors', 1, 3, function(err, result) {
	console.log(result);
});


// GET/SET set
// ==========================

client.sadd('names', 'Foo', 'Bar', 'Doe', 'Bar');

client.smembers('names', function(err, result) {
	console.log(result);
});


// check a key
// ==========================

client.exists('countries', function(err, result) {
	console.log(result === 1 ? 'Exists' : 'Doesn\'t exist');
})

// delete the key
// ==========================

client.del('countries', function(err, result) {
	console.log(result);
});


// expire the key
// ==========================

client.expire('names', 5);							// pair with 'names' as the key will disappear in 5 seconds
client.set('currentCity', 'New Delhi', 'EX', 10);	// pair with 'currentCity' as the key will disappear in 10 seconds


// increment/decrement
// ==========================

client.set('count', 10, function() {
	
	client.incr('count', function(err, result) {
		console.log(result);	// 11
	});
});

client.set('count', 10, function() {
	
	client.decrby('count', 20, function(err, result) {
		console.log(result);	// -10
	});
});


// pub/sub
// ==========================

const subscriber = redis.createClient();
const publisher  = redis.createClient();

subscriber.on('message', function(channel, msg) {
	console.log(`Message ${msg} on channel ${channel} arrived!`);
});

subscriber.subscribe('user/added');
publisher.publish('user/added', 'Foo');
publisher.publish('user/added', 'Bar');

subscriber.unsubscribe('user/added');
publisher.publish('user/added', 'Doe');