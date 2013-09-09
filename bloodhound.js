/**
 * Javascript prototype functions that allow you to quickly and simply report
 * on events assigned to elements using addEventListener and removeEventListener.
 * For example el.checkEventSummary( 'mouseup' );
 */

// Keep the original methods but rename to actualAddEventListener and actualRemoveEventListener
Node.prototype.actualAddEventListener    = Node.prototype.addEventListener;
Node.prototype.actualRemoveEventListener = Node.prototype.removeEventListener;

/**
 * Function to check that an event exists on an element
 * @param  {String}  event  event to check for
 * @return {Boolean} does this event exists
 */
Node.prototype.checkEventSummary = function( eventType ) {

    var x, _i, _len, _results;

    _results = [ ];

    if ( this.listenerSummary ){
        for ( _i = 0, _len = this.listenerSummary.length; _i < _len; _i++ ) {
            x = this.listenerSummary[ _i ];
            if ( x === eventType ) {
                return true;
            }
        }
    }

    return false;



};

/**
 * Removes an event from listenerSummary
 * @param {String} eventType Event to remove
 */
Array.prototype.removeEventSummary = function( eventType ) {

    var x, _i, _len, _results;

    _results = [ ];

    for ( _i = 0, _len = this.length; _i < _len; _i++ ) {
        x = this[ _i ];
        if ( x !== eventType ) {
            _results.push( x );
        }
    }
    return _results;
};

/**
 * Enhanced addEventListner
 * @param  {String}  type       A string representing the event type to listen for.
 * @param  {Object}  listener   The object that receives a notification when an event of the specified type occurs.
 * @param  {Boolean} useCapture Indicates that the user wishes to initiate capture.
 */
Node.prototype.addEventListener = function( type, listener, useCapture ) {

    this.actualAddEventListener( type, listener, useCapture );

    if ( !this.listenerSummary ) {
        this.listenerSummary = new Array( );
    };

    this.listenerSummary.push( type );
};

/**
 * Enhanced removeEventListener
 * @param  {String}  type       A string representing the event type to listen for.
 * @param  {Object}  listener   The object that receives a notification when an event of the specified type occurs.
 * @param  {Boolean} useCapture Indicates that the user wishes to initiate capture.
 */
Node.prototype.removeEventListener = function( type, listener, useCapture ) {

    this.actualRemoveEventListener( type, listener, useCapture );
    if ( this.listenerSummary ){
        this.listenerSummary = this.listenerSummary.removeEventSummary( type );
    }

};