describe("A cat", function() {

  var obj;

  beforeEach(function() {
    obj = new Foothold.Cat('Hello');
  });

  afterEach(function() {

  });

  it("should have its required properties", function() {
    expect(typeof obj.msg).toEqual('string');
    expect(obj.name).toEqual('Cat');
  });

  it("should have a method speak() that accepts some text and returns a message.", function() {
    expect(obj.speak('doggy')).toEqual('From Cat: Hello, doggy.');
  });
});