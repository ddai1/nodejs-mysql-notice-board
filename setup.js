// Modules
var mysql = require( 'mysql' );

// Database config
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root', // remember to sudo into mysql to see database
  password : ''
});

// Connect to database
connection.connect( function( err ) {
    if( err ) return console.log( 'Error connecting' );
    console.log( 'connected as id ' + connection.threadId );
    return runQueries();
});

function runQueries() {
    connection.query( 'CREATE DATABASE IF NOT EXISTS `notice_board`', function( err ) {
        if( err ) return console.log( 'Error creating database "notice_board"' );
        return console.log( 'Database "notice_board" present' );
    });

    connection.query( 'USE `notice_board`', function( err ) {
        if( err ) return console.log( 'cannot USE database "notice_board"' );
        return console.log( 'using database "notice_board" for further queries' );
    });

    connection.query( 'DROP TABLE IF EXISTS item', function( err ) {
        if( err ) return console.log( 'Error checking table "item"' );
    });

    connection.query(
        'CREATE TABLE item (' +
        'id INT(11) AUTO_INCREMENT, ' +
        'title VARCHAR(255), ' +
        'description TEXT, ' +
        'created DATETIME DEFAULT NOW(), ' +
        'PRIMARY KEY (id))', function( err ) {
        if( err ) return console.log( 'Error creating table "item"' );
        return console.log( 'table "item" created' );
    });

    connection.query( 'DROP TABLE IF EXISTS review', function( err ) {
        if( err ) return console.log( 'Error checking table "review"' );
    });

    connection.query(
        'CREATE TABLE review (' +
        'id INT(11) AUTO_INCREMENT, ' +
        'item_id INT(11), ' +
        'text TEXT, ' +
        'stars INT(1), ' +
        'created DATETIME DEFAULT NOW(), ' +
        'PRIMARY KEY (id))', function( err ) {
        if( err ) return console.log( 'Error creating table "review"' );
        return console.log( 'table "review" created' );
    });

    connection.end();
}


