// Modules
var express = require( 'express' ),
    jade = require( 'jade' ),
    mysql = require( 'mysql' ),
    connection = mysql.createConnection( require( './config' ) ),
    bodyParser = require( 'body-parser' );

var app = express();
app.set( 'view engine', 'jade' );
app.set( 'views', __dirname + '/views' );
app.use( bodyParser() );

// Routes
app.get( '/', function( req, res, next ) {
    connection.query( 'SELECT id, title, description FROM item', function( err, result ) {
        if( err ) return next( err );
        res.render( 'index', { items: result } );
    });
});

app.post( '/create', function( req, res, next ) {
    connection.query( 'INSERT INTO item SET title = ?, description = ?', [ req.body.title, req.body.description ], function( err, info ) {
        if( err ) return next( err );
        res.redirect( '/' );
        console.log( 'Item created:' );
        console.log( info );
    });
});

app.get( '/item/:id', function( req, res, next ) {

    // Get item
    function getItem( fn ) {
        connection.query( 'SELECT id, title, description FROM item WHERE id = ? LIMIT 1', [ req.params.id ], function( err, result ) {
            if( err ) return next( err );
            if( ! result[ 0 ] ) return res.send( 404 );
            return fn( result[ 0 ] );
        }); 
    }
    
    // Get reviews
    function getReviews( item_id, fn ) {
        connection.query( 'SELECT text, stars FROM review WHERE item_id = ?', [ item_id ], function( err, result ) {
            if( err ) return next( err );
            return fn( result );
        });
    }

    // Combine the returned function results to the view
    getItem( function( item ) {
        getReviews( item.id, function( reviews ) {
            res.render( 'item', { item: item, reviews: reviews } );
        });
    });
});

app.post( '/item/:id/review', function( req, res, next ) {
    connection.query( 'INSERT INTO review SET item_id = ?, stars = ?, text = ?', [ req.params.id, req.body.stars, req.body.text ], function( err, info ) {
        if( err ) return next( err );
        res.redirect( '/item/' + req.params.id );
        console.log( 'Review submitted:' );
        console.log( info );
    });
});

// Connect to database
connection.connect( function( err ) {
    if( err ) return console.log( 'Error connecting' );
    return  console.log( 'Connected to MySQL. Thread id: ' + connection.threadId );
});

// Launch app
app.listen( 3000, function() {
    console.log( 'App started - listening on port 3000' );
});

