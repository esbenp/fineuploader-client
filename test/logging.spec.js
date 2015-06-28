describe('Logging functions', function(){
    beforeEach(function(){
        spyOn(console, 'log');
    });

    it('should log a debug message in debug mode', function(){
        debug('debug');
        expect(console.log).toHaveBeenCalledWith(['debug: debug']);
    });

    it('should not log a debug message in production mode', function(){
        __DEBUG__ = false;
        debug('debug');
        expect(console.log).not.toHaveBeenCalledWith(['debug: debug']);
    });

    it('should log an error message', function(){
        err('error');
        expect(console.log).toHaveBeenCalledWith(['error: error']);
    });

    it('should return false on error loggings', function(){
        expect(err('error')).toBe(false);
    });
});