describe('Templating functions', function(){
    var instance = null;

    beforeEach(function(){
        instance = new Uploader;
    });

    it('should only be able to set a valid template engine', function(){
        var validEngine = function validEngine(){};
        validEngine.prototype.render = function render(){};
        var invalidEngine = {};

        expect(instance.setTemplateEngine(new validEngine)).toBe(true);
        expect(instance.getTemplateEngine().constructor.name).toBe('validEngine');
        expect(instance.setTemplateEngine(invalidEngine)).toBe(false);
        expect(instance.getTemplateEngine().constructor.name).toBe('validEngine');
    });

    it('should only be able to set a valid template loader', function(){
        var validLoader = function validLoader(){};
        validLoader.prototype.load = function load(){};
        var invalidLoader = {};

        expect(instance.setTemplateLoader(new validLoader)).toBe(true);
        expect(instance.getTemplateLoader().constructor.name).toBe('validLoader');
        expect(instance.setTemplateLoader(invalidLoader)).toBe(false);
        expect(instance.getTemplateLoader().constructor.name).toBe('validLoader');
    });
});